'use client';

import { Eye, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-lens-cream/95 backdrop-blur-sm border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-lens-dark rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-lens-gold" />
            </div>
            <span className="text-xl font-semibold text-lens-dark tracking-tight">
              Lens News
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink active>深度阅读</NavLink>
            <NavLink>概念图谱</NavLink>
            <NavLink>立场对比</NavLink>
            <NavLink>演进脉络</NavLink>
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
              <MobileNavLink active>深度阅读</MobileNavLink>
              <MobileNavLink>概念图谱</MobileNavLink>
              <MobileNavLink>立场对比</MobileNavLink>
              <MobileNavLink>演进脉络</MobileNavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLink({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return (
    <button
      className={`text-sm font-medium transition-colors duration-200 ${
        active
          ? 'text-lens-gold'
          : 'text-gray-600 hover:text-lens-dark'
      }`}
    >
      {children}
    </button>
  );
}

function MobileNavLink({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return (
    <button
      className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
        active
          ? 'text-lens-gold bg-lens-gold/10'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  );
}
