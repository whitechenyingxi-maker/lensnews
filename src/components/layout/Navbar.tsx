'use client';

import { Eye, Menu, X, Bookmark, Search } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSearch } from '@/context/SearchContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { searchQuery, setSearchQuery } = useSearch();
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.trim() && pathname !== '/home' && pathname !== '/') {
      router.push('/home');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-lens-cream/95 backdrop-blur-sm border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/home" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-lens-dark rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-lens-gold" />
            </div>
            <span className="text-xl font-semibold text-lens-dark tracking-tight">
              Lens News
            </span>
          </Link>

          {/* Search and Navigation */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Search Box - Always visible */}
            <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="搜索新闻..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    if (pathname !== '/home' && pathname !== '/') {
                      router.push('/home');
                    }
                  }
                }}
                className="outline-none text-sm w-48"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="ml-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Navigation Links */}
            <NavLink href="/radar" active={isActive('/radar')} icon={<Bookmark className="w-4 h-4" />}>
              关注追踪
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-lens-dark hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200/50">
            <div className="flex flex-col space-y-2">
              {/* Mobile Search */}
              <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 mb-4">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="搜索新闻..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      setMobileMenuOpen(false);
                      if (pathname !== '/home' && pathname !== '/') {
                        router.push('/home');
                      }
                    }
                  }}
                  className="outline-none text-sm flex-1"
                />
              </div>
              <MobileNavLink href="/radar" active={isActive('/radar')} icon={<Bookmark className="w-5 h-5" />}>
                关注追踪
              </MobileNavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLink({ 
  href, 
  children, 
  active = false,
  icon
}: { 
  href: string; 
  children: React.ReactNode; 
  active?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        active
          ? 'bg-lens-dark text-white'
          : 'text-gray-600 hover:bg-gray-100 hover:text-lens-dark'
      }`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}

function MobileNavLink({ 
  href, 
  children, 
  active = false,
  icon
}: { 
  href: string; 
  children: React.ReactNode; 
  active?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-3 px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200 ${
        active
          ? 'bg-lens-dark text-white'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}
