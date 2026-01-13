'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function ParticlePage() {
  useEffect(() => {
    const initParticleSystem = () => {
      if (typeof window === 'undefined') return;
      
      const THREE = (window as any).THREE;
      const gsap = (window as any).gsap;
      const Hands = (window as any).Hands;
      const Camera = (window as any).Camera;

      if (!THREE || !gsap || !Hands || !Camera) {
        console.log('Waiting for libraries...');
        return;
      }

      let scene: any, camera: any, renderer: any, particleSystem: any;
      const particleCount = 10000;
      let currentGesture = "";
      let isPinching = false;

      const createParticleTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, 'rgba(255,255,255,1)');
        grad.addColorStop(0.3, 'rgba(0,200,255,0.6)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 64, 64);
        return new THREE.CanvasTexture(canvas);
      };

      const Shapes = {
        getSphere() {
          const pts = [];
          for (let i = 0; i < particleCount; i++) {
            const r = 15 + Math.random() * 5;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            pts.push(new THREE.Vector3(
              r * Math.sin(phi) * Math.cos(theta),
              r * Math.sin(phi) * Math.sin(theta),
              r * Math.cos(phi)
            ));
          }
          return pts;
        },
        getText(text: string) {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) return [];
          canvas.width = 600;
          canvas.height = 300;
          ctx.fillStyle = 'white';
          ctx.font = 'bold 120px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(text, 300, 150);
          const data = ctx.getImageData(0, 0, 600, 300).data;
          const pts = [];
          for (let y = 0; y < 300; y += 3) {
            for (let x = 0; x < 600; x += 3) {
              if (data[(y * 600 + x) * 4] > 128) {
                pts.push(new THREE.Vector3(
                  (x - 300) * 0.08,
                  -(y - 150) * 0.08,
                  (Math.random() - 0.5) * 2
                ));
              }
            }
          }
          return pts;
        },
        getHeart() {
          const pts = [];
          for (let i = 0; i < particleCount; i++) {
            const t = Math.random() * Math.PI * 2;
            const scale = 8;
            const x = scale * 16 * Math.pow(Math.sin(t), 3);
            const y = scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
            pts.push(new THREE.Vector3(x, y, (Math.random() - 0.5) * 5));
          }
          return pts;
        },
        getCube() {
          const pts = [];
          const size = 20;
          for (let i = 0; i < particleCount; i++) {
            pts.push(new THREE.Vector3(
              (Math.random() - 0.5) * size,
              (Math.random() - 0.5) * size,
              (Math.random() - 0.5) * size
            ));
          }
          return pts;
        }
      };

      const init = () => {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 35;

        const canvas = document.getElementById('particle-canvas') as HTMLCanvasElement;
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);

        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(particleCount * 3);
        const cols = new Float32Array(particleCount * 3);

        const spherePts = Shapes.getSphere();
        for (let i = 0; i < particleCount; i++) {
          pos[i * 3] = spherePts[i].x;
          pos[i * 3 + 1] = spherePts[i].y;
          pos[i * 3 + 2] = spherePts[i].z;
          cols[i * 3] = 0.5;
          cols[i * 3 + 1] = 0.8;
          cols[i * 3 + 2] = 1.0;
        }

        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(cols, 3));

        const mat = new THREE.PointsMaterial({
          size: 0.4,
          map: createParticleTexture(),
          vertexColors: true,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });

        particleSystem = new THREE.Points(geo, mat);
        scene.add(particleSystem);

        const animate = () => {
          requestAnimationFrame(animate);
          particleSystem.rotation.y += 0.001;
          particleSystem.geometry.attributes.position.needsUpdate = true;
          particleSystem.geometry.attributes.color.needsUpdate = true;
          renderer.render(scene, camera);
        };
        animate();

        window.addEventListener('resize', () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        });
      };

      const transform = (targetPoints: any[], colorHex: string) => {
        const pos = particleSystem.geometry.attributes.position.array;
        const col = particleSystem.geometry.attributes.color.array;
        const c = new THREE.Color(colorHex);

        for (let i = 0; i < particleCount; i++) {
          const t = targetPoints[i % targetPoints.length];
          gsap.to(pos, {
            [i * 3]: t.x + (Math.random() - 0.5) * 0.5,
            [i * 3 + 1]: t.y + (Math.random() - 0.5) * 0.5,
            [i * 3 + 2]: t.z,
            duration: 0.7,
            ease: "expo.out"
          });
          gsap.to(col, {
            [i * 3]: c.r,
            [i * 3 + 1]: c.g,
            [i * 3 + 2]: c.b,
            duration: 0.7
          });
        }
      };

      init();

      const hands = new Hands({
        locateFile: (f: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${f}`
      });
      
      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.8,
        minTrackingConfidence: 0.5
      });

      hands.onResults((res: any) => {
        if (!res.multiHandLandmarks || res.multiHandLandmarks.length === 0) {
          isPinching = false;
          return;
        }
        const lm = res.multiHandLandmarks[0];

        const dist = Math.sqrt(
          Math.pow(lm[4].x - lm[8].x, 2) + Math.pow(lm[4].y - lm[8].y, 2)
        );

        if (dist < 0.04) {
          if (!isPinching) {
            isPinching = true;
            const shapes = [
              { points: Shapes.getText('HELLO'), color: '#ff00ff' },
              { points: Shapes.getHeart(), color: '#ff0066' },
              { points: Shapes.getCube(), color: '#00ffff' },
              { points: Shapes.getSphere(), color: '#00ff88' }
            ];
            const random = shapes[Math.floor(Math.random() * shapes.length)];
            transform(random.points, random.color);
          }

          const tx = (lm[8].x - 0.5) * -60;
          const ty = (lm[8].y - 0.5) * -40;
          gsap.to(particleSystem.position, {
            x: tx,
            y: ty,
            duration: 0.3,
            ease: "power2.out"
          });
        } else {
          if (isPinching) {
            isPinching = false;
            gsap.to(particleSystem.position, {
              x: 0,
              y: 0,
              duration: 0.5,
              ease: "back.out"
            });
          }
        }

        const fingerTips = [lm[8].y, lm[12].y, lm[16].y, lm[20].y];
        const openFingers = fingerTips.filter((y, i) => y < lm[0].y - 0.1).length;

        if (openFingers === 5 && currentGesture !== 'palm') {
          currentGesture = 'palm';
          transform(Shapes.getSphere(), '#ffaa00');
        } else if (openFingers === 2 && currentGesture !== 'peace') {
          currentGesture = 'peace';
          transform(Shapes.getText('PEACE'), '#00ff00');
        }
      });

      const videoElement = document.getElementById('input-video') as HTMLVideoElement;
      const cameraInstance = new Camera(videoElement, {
        onFrame: async () => {
          await hands.send({ image: videoElement });
        },
        width: 640,
        height: 480
      });
      cameraInstance.start();
    };

    const timer = setTimeout(initParticleSystem, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  };

  return (
    <>
      <Script 
        src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js" 
        strategy="afterInteractive"
      />
      <Script 
        src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js" 
        strategy="afterInteractive"
      />
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" 
        strategy="afterInteractive"
      />
      <Script 
        src="https://cdn.jsdelivr.net/npm/gsap@3.12.2/dist/gsap.min.js" 
        strategy="afterInteractive"
      />

      <div className="fixed inset-0 bg-black">
        <canvas id="particle-canvas" className="block w-full h-full" />
        
        <video 
          id="input-video" 
          className="hidden"
          playsInline
        />

        <div className="fixed top-5 right-5 z-50 flex flex-col gap-3">
          <button
            onClick={handleFullscreen}
            className="bg-white/10 border border-white/30 text-white px-4 py-2 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all whitespace-nowrap cursor-pointer"
          >
            <i className="ri-fullscreen-line mr-2"></i>
            全屏
          </button>
          
          <div className="bg-white/10 border border-white/30 text-white px-4 py-3 rounded-lg backdrop-blur-sm text-sm">
            <div className="font-semibold mb-2">手势控制：</div>
            <div className="space-y-1 text-xs opacity-90">
              <div>👌 捏合：移动粒子</div>
              <div>✋ 张开手掌：球体</div>
              <div>✌️ 比V：文字</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
