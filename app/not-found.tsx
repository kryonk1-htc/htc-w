'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setIsAuthenticated(true);
      const { data: userData } = await supabase
        .from('users')
        .select('family_id')
        .eq('id', user.id)
        .single();
      
      if (userData?.family_id) {
        router.push('/dashboard');
      } else {
        router.push('/family-setup');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
          <i className="ri-restaurant-2-line text-white text-6xl w-16 h-16 flex items-center justify-center"></i>
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">页面未找到</h2>
        <p className="text-gray-600 mb-8">
          看来您点击了无效链接或输入了不存在的网址。
        </p>

        {!isAuthenticated && (
          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all font-medium whitespace-nowrap"
            >
              返回首页
            </Link>
            <Link
              href="/auth"
              className="block w-full px-6 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium border border-gray-200 whitespace-nowrap"
            >
              前往登录
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
