'use client';

import Link from 'next/link';
import Header from '@/components/Header';

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-20">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl transform hover:scale-105 transition-transform">
              <i className="ri-restaurant-2-line text-white text-5xl w-12 h-12 flex items-center justify-center"></i>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">家庭厨房</h1>
            <p className="text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">让家庭美食规划变得简单有趣，和家人一起享受烹饪的乐趣</p>
            
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <Link
                href="/auth"
                className="px-10 py-5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all text-lg font-semibold shadow-xl hover:shadow-2xl whitespace-nowrap transform hover:scale-105"
              >
                立即开始
              </Link>
              <Link
                href="/particle"
                className="px-10 py-5 bg-white text-gray-900 rounded-2xl hover:bg-gray-50 transition-all text-lg font-semibold shadow-xl hover:shadow-2xl flex items-center gap-3 whitespace-nowrap transform hover:scale-105"
              >
                <i className="ri-magic-line w-6 h-6 flex items-center justify-center"></i>
                粒子互动
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <i className="ri-home-heart-line text-white text-4xl w-10 h-10 flex items-center justify-center"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">创建家庭</h3>
              <p className="text-gray-600 text-lg leading-relaxed">创建专属家庭空间，自动生成6位PIN码，邀请家人轻松加入</p>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <i className="ri-calendar-check-line text-white text-4xl w-10 h-10 flex items-center justify-center"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">规划菜单</h3>
              <p className="text-gray-600 text-lg leading-relaxed">创建菜单，记录食材清单，预约精确时间，让做饭井井有条</p>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <i className="ri-team-line text-white text-4xl w-10 h-10 flex items-center justify-center"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">协作分享</h3>
              <p className="text-gray-600 text-lg leading-relaxed">家庭成员共同参与，分享美食创意，记录温馨美好时刻</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-12 md:p-16 shadow-2xl">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">强大功能</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <i className="ri-user-add-line text-orange-600 text-2xl w-7 h-7 flex items-center justify-center"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-gray-900 mb-2">独立账号系统</h4>
                    <p className="text-gray-600 leading-relaxed">每个家庭成员拥有独立账号，数据安全可靠，隐私有保障</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <i className="ri-key-2-line text-red-600 text-2xl w-7 h-7 flex items-center justify-center"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-gray-900 mb-2">PIN码快速加入</h4>
                    <p className="text-gray-600 leading-relaxed">通过6位PIN码即可快速加入家庭，简单方便不复杂</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <i className="ri-restaurant-line text-pink-600 text-2xl w-7 h-7 flex items-center justify-center"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-gray-900 mb-2">完整菜单管理</h4>
                    <p className="text-gray-600 leading-relaxed">记录菜品名称、所需食材、烹饪时间和详细备注</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <i className="ri-time-line text-purple-600 text-2xl w-7 h-7 flex items-center justify-center"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-gray-900 mb-2">精确时间预约</h4>
                    <p className="text-gray-600 leading-relaxed">时间精确到分钟，提前规划每一餐，不错过美食时刻</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <i className="ri-shield-check-line text-blue-600 text-2xl w-7 h-7 flex items-center justify-center"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-gray-900 mb-2">数据安全保护</h4>
                    <p className="text-gray-600 leading-relaxed">采用行级安全策略，只能查看和管理自己家庭的数据</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <i className="ri-history-line text-green-600 text-2xl w-7 h-7 flex items-center justify-center"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-gray-900 mb-2">历史记录查看</h4>
                    <p className="text-gray-600 leading-relaxed">查看即将到来和历史菜单，回顾美好的烹饪时光</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-12 md:p-16 shadow-2xl text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">准备好开始了吗？</h2>
              <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">注册账号，创建家庭，邀请家人，一起规划美味生活</p>
              <Link
                href="/auth"
                className="inline-block px-12 py-5 bg-white text-orange-600 rounded-2xl hover:bg-gray-50 transition-all text-lg font-bold shadow-xl hover:shadow-2xl whitespace-nowrap transform hover:scale-105"
              >
                立即注册
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
