'use client';

import { useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { createSupbaseBrowserClient } from '../../utils/supabase/client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import ProfileMenu from './ProfileMenu';

interface HeaderProps {
  user: User;
}

export default function Header({ user }: HeaderProps) {
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = async () => {
    try {
      const supabase = createSupbaseBrowserClient();
      await supabase.auth.signOut();
      router.push('/v1/signin');
    } catch (error: any) {
      toast.error(error?.message ?? 'Something went wrong');
    }
  };

  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'User';
  const userEmail = user?.email || '';

  return (
    <div className="border-b border-gray-200 bg-white px-6 py-4">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
        <ProfileMenu
          userName={userName}
          userEmail={userEmail}
          showMenu={showProfileMenu}
          onToggleMenu={() => setShowProfileMenu(!showProfileMenu)}
          onCloseMenu={() => setShowProfileMenu(false)}
          onLogout={handleLogout}
        />
      </div>
    </div>
  );
}

