'use client';

interface ProfileMenuProps {
  userName: string;
  userEmail: string;
  showMenu: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  onLogout: () => void;
}

export default function ProfileMenu({
  userName,
  userEmail,
  showMenu,
  onToggleMenu,
  onCloseMenu,
  onLogout,
}: ProfileMenuProps) {
  return (
    <div className="relative flex items-center gap-3">
      <div className="text-right">
        <p className="text-sm font-medium text-gray-900">{userName}</p>
        <p className="text-xs text-gray-600">{userEmail}</p>
      </div>
      <button
        onClick={onToggleMenu}
        className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        aria-label="Profile menu"
      ></button>

      {/* Profile Dropdown Menu */}
      {showMenu && (
        <>
          {/* Invisible overlay to close menu when clicking outside */}
          <div
            className="fixed inset-0 z-10"
            onClick={onCloseMenu}
          ></div>

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 z-20 w-56 rounded-lg border border-gray-200 bg-white shadow-lg">
            <div className="p-4 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-900">{userName}</p>
              <p className="text-xs text-gray-600">{userEmail}</p>
            </div>
            <div className="py-2">
              <button
                onClick={onLogout}
                className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

