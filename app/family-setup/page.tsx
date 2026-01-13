'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function FamilySetupPage() {
  const [mode, setMode] = useState<'create' | 'join'>('create');
  const [familyName, setFamilyName] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    console.log('当前用户:', user);
    if (!user) {
      router.push('/auth');
      return;
    }
    setUserId(user.id);

    const { data: userData } = await supabase
      .from('users')
      .select('family_id')
      .eq('id', user.id)
      .single();

    if (userData?.family_id) {
      router.push('/dashboard');
    }
  };

  const generatePinCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleCreateFamily = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      console.log('开始创建家庭...');
      console.log('用户ID:', userId);
      console.log('家庭名称:', familyName);

      if (!userId) {
        throw new Error('用户ID不存在，请重新登录');
      }

      const newPinCode = generatePinCode();
      console.log('生成的PIN码:', newPinCode);

      const insertData = {
        name: familyName,
        pin_code: newPinCode,
        creator_id: userId,
      };
      console.log('准备插入的数据:', insertData);

      const { data: family, error: familyError } = await supabase
        .from('families')
        .insert(insertData)
        .select()
        .single();

      console.log('插入结果:', { family, error: familyError });

      if (familyError) {
        console.error('创建家庭失败:', familyError);
        throw familyError;
      }

      console.log('家庭创建成功，开始更新用户信息...');

      const { error: updateError } = await supabase
        .from('users')
        .update({ family_id: family.id })
        .eq('id', userId);

      if (updateError) {
        console.error('更新用户失败:', updateError);
        throw updateError;
      }

      console.log('用户信息更新成功，跳转到仪表板');
      router.push('/dashboard');
    } catch (error: any) {
      console.error('完整错误信息:', error);
      setMessage(error.message || '创建失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinFamily = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      console.log('=== 开始加入家庭 ===');
      console.log('输入的PIN码:', pinCode);
      console.log('PIN码类型:', typeof pinCode);
      console.log('PIN码长度:', pinCode.length);
      console.log('当前用户ID:', userId);

      const { data: families, error: familyError } = await supabase
        .from('families')
        .select('*')
        .eq('pin_code', pinCode);

      console.log('查询结果:', families);
      console.log('查询错误:', familyError);

      if (familyError) {
        console.error('查询出错:', familyError);
        throw new Error('查询失败: ' + familyError.message);
      }

      if (!families || families.length === 0) {
        console.log('没有找到匹配的家庭');
        
        const { data: allFamilies } = await supabase
          .from('families')
          .select('pin_code');
        console.log('数据库中所有的PIN码:', allFamilies);
        
        throw new Error('PIN码不正确，请检查后重试');
      }

      const family = families[0];
      console.log('找到的家庭:', family);

      console.log('开始更新用户的family_id...');
      const { error: updateError } = await supabase
        .from('users')
        .update({ family_id: family.id })
        .eq('id', userId);

      if (updateError) {
        console.error('更新用户失败:', updateError);
        throw updateError;
      }

      console.log('加入家庭成功！跳转到仪表板');
      router.push('/dashboard');
    } catch (error: any) {
      console.error('加入家庭失败:', error);
      setMessage(error.message || '加入失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="ri-home-heart-line text-white text-3xl w-8 h-8 flex items-center justify-center"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">设置家庭</h1>
          <p className="text-gray-600">创建或加入一个家庭</p>
        </div>

        <div className="flex gap-2 mb-6 bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setMode('create')}
            className={`flex-1 py-2 px-4 rounded-full font-medium transition-all whitespace-nowrap ${
              mode === 'create' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600'
            }`}
          >
            创建家庭
          </button>
          <button
            onClick={() => setMode('join')}
            className={`flex-1 py-2 px-4 rounded-full font-medium transition-all whitespace-nowrap ${
              mode === 'join' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600'
            }`}
          >
            加入家庭
          </button>
        </div>

        {mode === 'create' ? (
          <form onSubmit={handleCreateFamily} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">家庭名称</label>
              <input
                type="text"
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                placeholder="例如：王家厨房"
                required
              />
              <p className="text-xs text-gray-500 mt-2">创建后会自动生成一个6位PIN码，分享给家庭成员即可加入</p>
            </div>

            {message && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-medium hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading ? '创建中...' : '创建家庭'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleJoinFamily} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">家庭PIN码</label>
              <input
                type="text"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value.trim())}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-center text-2xl tracking-widest"
                placeholder="000000"
                required
                maxLength={6}
                pattern="[0-9]{6}"
              />
              <p className="text-xs text-gray-500 mt-2">请输入家庭创建者提供的6位PIN码</p>
            </div>

            {message && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-medium hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading ? '加入中...' : '加入家庭'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
