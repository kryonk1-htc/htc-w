'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CreateMenuModal from '@/components/CreateMenuModal';
import MenuCard from '@/components/MenuCard';

interface Menu {
  id: string;
  dish_name: string;
  ingredients: string;
  scheduled_time: string;
  notes: string;
  creator_id: string;
  created_at: string;
  creator_name?: string;
}

interface FamilyInfo {
  id: string;
  name: string;
  pin_code: string;
  creator_id: string;
}

export default function DashboardPage() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [familyInfo, setFamilyInfo] = useState<FamilyInfo | null>(null);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPinCode, setShowPinCode] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/auth');
      return;
    }

    setUserId(user.id);

    const { data: userData } = await supabase
      .from('users')
      .select('name, family_id')
      .eq('id', user.id)
      .single();

    if (!userData?.family_id) {
      router.push('/family-setup');
      return;
    }

    setUserName(userData.name);

    const { data: familyData } = await supabase
      .from('families')
      .select('*')
      .eq('id', userData.family_id)
      .single();

    if (familyData) {
      setFamilyInfo(familyData);
    }

    loadMenus(userData.family_id);
  };

  const loadMenus = async (familyId: string) => {
    setLoading(true);
    const { data: menusData } = await supabase
      .from('menus')
      .select('*')
      .eq('family_id', familyId)
      .order('scheduled_time', { ascending: true });

    if (menusData) {
      const menusWithCreators = await Promise.all(
        menusData.map(async (menu) => {
          const { data: creator } = await supabase
            .from('users')
            .select('name')
            .eq('id', menu.creator_id)
            .single();

          return {
            ...menu,
            creator_name: creator?.name || '未知',
          };
        })
      );

      setMenus(menusWithCreators);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const handleMenuCreated = () => {
    if (familyInfo) {
      loadMenus(familyInfo.id);
    }
  };

  const handleMenuDeleted = (menuId: string) => {
    setMenus(menus.filter(m => m.id !== menuId));
  };

  const upcomingMenus = menus.filter(m => new Date(m.scheduled_time) >= new Date());
  const pastMenus = menus.filter(m => new Date(m.scheduled_time) < new Date());

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <i className="ri-restaurant-2-line text-white text-2xl w-6 h-6 flex items-center justify-center"></i>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{familyInfo?.name}</h1>
                <p className="text-sm text-gray-600">欢迎回来，{userName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowPinCode(!showPinCode)}
                className="px-4 py-2 bg-orange-100 text-orange-600 rounded-xl hover:bg-orange-200 transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <i className="ri-key-2-line w-5 h-5 flex items-center justify-center"></i>
                PIN码
              </button>
              <Link
                href="/particle"
                className="px-4 py-2 bg-purple-100 text-purple-600 rounded-xl hover:bg-purple-200 transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <i className="ri-magic-line w-5 h-5 flex items-center justify-center"></i>
                粒子互动
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <i className="ri-logout-box-line w-5 h-5 flex items-center justify-center"></i>
                退出
              </button>
            </div>
          </div>

          {showPinCode && familyInfo && (
            <div className="mt-4 p-4 bg-orange-50 rounded-xl border border-orange-200">
              <p className="text-sm text-gray-600 mb-2">分享此PIN码给家庭成员：</p>
              <div className="flex items-center gap-3">
                <code className="text-3xl font-bold text-orange-600 tracking-widest">{familyInfo.pin_code}</code>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(familyInfo.pin_code);
                    alert('PIN码已复制到剪贴板');
                  }}
                  className="px-3 py-1 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all text-sm whitespace-nowrap"
                >
                  复制
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">菜单计划</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <i className="ri-add-line w-5 h-5 flex items-center justify-center"></i>
            创建菜单
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {upcomingMenus.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-calendar-check-line text-orange-600 w-5 h-5 flex items-center justify-center"></i>
                  即将到来
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {upcomingMenus.map((menu) => (
                    <MenuCard
                      key={menu.id}
                      menu={menu}
                      currentUserId={userId}
                      onDeleted={handleMenuDeleted}
                    />
                  ))}
                </div>
              </div>
            )}

            {pastMenus.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-history-line text-gray-600 w-5 h-5 flex items-center justify-center"></i>
                  历史记录
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pastMenus.map((menu) => (
                    <MenuCard
                      key={menu.id}
                      menu={menu}
                      currentUserId={userId}
                      onDeleted={handleMenuDeleted}
                      isPast
                    />
                  ))}
                </div>
              </div>
            )}

            {menus.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-restaurant-line text-gray-400 text-5xl w-12 h-12 flex items-center justify-center"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">还没有菜单</h3>
                <p className="text-gray-600 mb-6">创建第一个菜单，开始规划家庭美食吧！</p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all inline-flex items-center gap-2 whitespace-nowrap"
                >
                  <i className="ri-add-line w-5 h-5 flex items-center justify-center"></i>
                  创建菜单
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {showCreateModal && familyInfo && (
        <CreateMenuModal
          familyId={familyInfo.id}
          userId={userId}
          onClose={() => setShowCreateModal(false)}
          onCreated={handleMenuCreated}
        />
      )}
    </div>
  );
}
