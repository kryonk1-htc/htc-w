'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isLogin) {
        console.log('尝试登录，邮箱:', formData.email);
        
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        console.log('登录响应:', { data, error });

        if (error) {
          console.error('登录错误详情:', {
            message: error.message,
            status: error.status,
            name: error.name
          });
          
          if (error.message.includes('Invalid login credentials') || error.message.includes('Invalid')) {
            throw new Error('邮箱或密码错误');
          }
          if (error.message.includes('Email not confirmed')) {
            throw new Error('请先验证您的邮箱');
          }
          throw new Error(error.message);
        }

        if (data.user) {
          console.log('登录成功，用户ID:', data.user.id);
          
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('family_id')
            .eq('id', data.user.id)
            .single();

          console.log('查询用户数据:', { userData, userError });

          if (userData?.family_id) {
            router.push('/dashboard');
          } else {
            router.push('/family-setup');
          }
        }
      } else {
        if (formData.password.length < 6) {
          throw new Error('密码至少需要6位');
        }

        if (!formData.name.trim()) {
          throw new Error('请输入姓名');
        }

        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
            }
          }
        });

        if (error) {
          if (error.message.includes('already registered') || error.message.includes('User already registered')) {
            throw new Error('该邮箱已被注册');
          }
          throw new Error(error.message);
        }

        if (data.user) {
          const response = await fetch(
            'https://motdkuiteqxtmdxrtvef.supabase.co/functions/v1/register-user',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userId: data.user.id,
                name: formData.name,
                email: formData.email,
              }),
            }
          );

          const result = await response.json();

          if (!response.ok) {
            console.error('保存用户信息失败:', result);
            throw new Error('注册失败，请重试');
          }

          setSuccess('注册成功！正在跳转...');
          
          setTimeout(() => {
            router.push('/family-setup');
          }, 1500);
        }
      }
    } catch (err: any) {
      console.error('操作失败详情:', {
        message: err?.message,
        stack: err?.stack,
        error: err
      });
      setError(err?.message || '操作失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center p-4">
      <div className="absolute top-6 left-6">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer">
          <i className="ri-restaurant-2-fill text-orange-500 w-8 h-8 flex items-center justify-center"></i>
          <span className="font-['Pacifico']">家庭厨房</span>
        </Link>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <i className="ri-user-heart-fill text-white text-3xl w-8 h-8 flex items-center justify-center"></i>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {isLogin ? '欢迎回来' : '加入我们'}
            </h1>
            <p className="text-gray-600">
              {isLogin ? '登录您的家庭厨房账户' : '创建您的家庭厨房账户'}
            </p>
          </div>

          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setIsLogin(true);
                setError('');
                setSuccess('');
              }}
              className={`flex-1 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
                isLogin
                  ? 'bg-white text-orange-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              登录
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLogin(false);
                setError('');
                setSuccess('');
              }}
              className={`flex-1 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
                !isLogin
                  ? 'bg-white text-orange-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              注册
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <i className="ri-error-warning-fill text-red-500 text-xl w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5"></i>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
              <i className="ri-checkbox-circle-fill text-green-500 text-xl w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5"></i>
              <p className="text-green-700 text-sm">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  姓名
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 flex items-center justify-center">
                    <i className="ri-user-line text-lg"></i>
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
                    placeholder="请输入您的姓名"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                邮箱
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 flex items-center justify-center">
                  <i className="ri-mail-line text-lg"></i>
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                密码
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 flex items-center justify-center">
                  <i className="ri-lock-line text-lg"></i>
                </div>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
                  placeholder="至少6位密码"
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-medium hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              {loading ? (
                <>
                  <i className="ri-loader-4-line animate-spin text-xl w-5 h-5 flex items-center justify-center"></i>
                  <span>处理中...</span>
                </>
              ) : (
                <span>{isLogin ? '登录' : '注册'}</span>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            {isLogin ? (
              <p>
                还没有账户？
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(false);
                    setError('');
                    setSuccess('');
                  }}
                  className="text-orange-600 hover:text-orange-700 font-medium ml-1 cursor-pointer"
                >
                  立即注册
                </button>
              </p>
            ) : (
              <p>
                已有账户？
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(true);
                    setError('');
                    setSuccess('');
                  }}
                  className="text-orange-600 hover:text-orange-700 font-medium ml-1 cursor-pointer"
                >
                  立即登录
                </button>
              </p>
            )}
          </div>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          登录即表示您同意我们的
          <a href="#" className="text-orange-600 hover:text-orange-700 mx-1 cursor-pointer">服务条款</a>
          和
          <a href="#" className="text-orange-600 hover:text-orange-700 ml-1 cursor-pointer">隐私政策</a>
        </p>
      </div>
    </div>
  );
}
