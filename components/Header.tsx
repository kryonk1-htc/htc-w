'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
              <i className="ri-restaurant-2-line text-white text-xl w-5 h-5 flex items-center justify-center"></i>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              家庭厨房
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/"
              className="text-gray-700 hover:text-orange-600 transition-colors font-medium whitespace-nowrap cursor-pointer"
            >
              首页
            </Link>
            <Link 
              href="/particle"
              className="text-gray-700 hover:text-orange-600 transition-colors font-medium whitespace-nowrap cursor-pointer"
            >
              粒子互动
            </Link>
            <Link 
              href="/auth"
              className="text-gray-700 hover:text-orange-600 transition-colors font-medium whitespace-nowrap cursor-pointer"
            >
              登录
            </Link>
            <Link 
              href="/auth"
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2.5 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all shadow-md hover:shadow-lg whitespace-nowrap cursor-pointer font-semibold"
            >
              开始使用
            </Link>
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-lg transition-colors"
          >
            <i className={`${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl text-gray-700`}></i>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 animate-fadeIn">
            <div className="flex flex-col space-y-4 pt-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium text-left whitespace-nowrap cursor-pointer py-2" 
                onClick={() => setIsMenuOpen(false)}
              >
                首页
              </Link>
              <Link 
                href="/particle" 
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium text-left whitespace-nowrap cursor-pointer py-2" 
                onClick={() => setIsMenuOpen(false)}
              >
                粒子互动
              </Link>
              <Link 
                href="/auth" 
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium text-left whitespace-nowrap cursor-pointer py-2" 
                onClick={() => setIsMenuOpen(false)}
              >
                登录
              </Link>
              <Link 
                href="/auth" 
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all shadow-md whitespace-nowrap cursor-pointer w-fit font-semibold" 
                onClick={() => setIsMenuOpen(false)}
              >
                开始使用
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
