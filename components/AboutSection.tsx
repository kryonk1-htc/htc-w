'use client';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">关于我</h2>
          <div className="w-20 h-1 bg-purple-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://readdy.ai/api/search-image?query=Creative%20workspace%20with%20modern%20laptop%2C%20notebook%2C%20coffee%20cup%2C%20and%20plants%20on%20wooden%20desk%2C%20warm%20natural%20lighting%20streaming%20through%20window%2C%20cozy%20and%20inspiring%20atmosphere%2C%20minimalist%20aesthetic%20with%20soft%20purple%20and%20white%20tones%2C%20professional%20lifestyle%20photography&width=800&height=600&seq=about-workspace&orientation=landscape"
              alt="工作空间"
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">你好，我是创作者</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              热爱生活，喜欢用文字和图片记录每一个值得纪念的瞬间。在这里，我分享我的思考、经历和创作。
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              相信每个人都有独特的故事，而我希望通过这个平台，与你分享我的故事，也期待听到你的声音。
            </p>
            
            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-quill-pen-line text-2xl text-purple-600"></i>
                </div>
                <h4 className="font-semibold text-gray-900">写作</h4>
                <p className="text-sm text-gray-600 mt-1">记录思考</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-camera-line text-2xl text-purple-600"></i>
                </div>
                <h4 className="font-semibold text-gray-900">摄影</h4>
                <p className="text-sm text-gray-600 mt-1">捕捉瞬间</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-lightbulb-line text-2xl text-purple-600"></i>
                </div>
                <h4 className="font-semibold text-gray-900">创意</h4>
                <p className="text-sm text-gray-600 mt-1">探索可能</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
