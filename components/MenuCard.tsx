'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface MenuCardProps {
  menu: {
    id: string;
    dish_name: string;
    ingredients: string;
    scheduled_time: string;
    notes: string;
    creator_name?: string;
  };
  currentUserId: string;
  onDeleted: (menuId: string) => void;
  isPast?: boolean;
}

export default function MenuCard({ menu, currentUserId, onDeleted, isPast = false }: MenuCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}年${month}月${day}日 ${hours}:${minutes}`;
  };

  const handleDelete = async () => {
    if (!confirm('确定要删除这个菜单吗？')) return;

    setDeleting(true);
    try {
      const { error } = await supabase
        .from('menus')
        .delete()
        .eq('id', menu.id);

      if (error) throw error;

      onDeleted(menu.id);
    } catch (error) {
      alert('删除失败，请重试');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-6 ${isPast ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{menu.dish_name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <i className="ri-user-line w-4 h-4 flex items-center justify-center"></i>
            <span>{menu.creator_name}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-orange-600">
            <i className="ri-time-line w-4 h-4 flex items-center justify-center"></i>
            <span>{formatDateTime(menu.scheduled_time)}</span>
          </div>
        </div>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all"
        >
          <i className={`ri-arrow-${showDetails ? 'up' : 'down'}-s-line text-xl w-5 h-5 flex items-center justify-center`}></i>
        </button>
      </div>

      {showDetails && (
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <i className="ri-shopping-basket-line w-4 h-4 flex items-center justify-center"></i>
              所需食材
            </h4>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{menu.ingredients}</p>
          </div>

          {menu.notes && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <i className="ri-file-text-line w-4 h-4 flex items-center justify-center"></i>
                备注
              </h4>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{menu.notes}</p>
            </div>
          )}

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center"></i>
            {deleting ? '删除中...' : '删除菜单'}
          </button>
        </div>
      )}
    </div>
  );
}
