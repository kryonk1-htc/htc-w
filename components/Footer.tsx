'use client';

import Link from 'next/link';

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-purple-400 font-pacifico">我的个人空间</h3>
            <p className="text-gray-400 leading-relaxed">
              记录生活，分享思考，探索无限可能。
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-lg">快速链接</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer"
                >
                  首页
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer"
                >
                  关于我
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('posts')}
                  className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer"
                >
                  动态
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer"
                >
                  联系我
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-lg">分类</h4>
            <ul className="space-y-2">
              <li><span className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer">生活随笔</span></li>
              <li><span className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer">创作分享</span></li>
              <li><span className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer">摄影日记</span></li>
              <li><span className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer">读书笔记</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-lg">关注我</h4>
            <div className="flex space-x-3 mb-4">
              <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                <i className="ri-twitter-fill"></i>
              </button>
              <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                <i className="ri-instagram-fill"></i>
              </button>
              <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                <i className="ri-github-fill"></i>
              </button>
            </div>
            <p className="text-gray-400 text-sm">
              hello@example.com
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 我的个人空间. 保留所有权利.
          </p>
          <div className="flex items-center space-x-6">
            <Link 
              href="https://readdy.ai/?ref=logo" 
              target="_blank"
              className="text-gray-400 hover:text-purple-400 transition-colors text-sm cursor-pointer"
            >
              Made with Readdy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
