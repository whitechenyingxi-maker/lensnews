'use client';

import { ConceptDirection } from '@/types';
import { X, BookOpen, ExternalLink, Tag, Lightbulb } from 'lucide-react';
import { useEffect } from 'react';

interface KnowledgeDrawerProps {
  direction: ConceptDirection | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function KnowledgeDrawer({ direction, isOpen, onClose }: KnowledgeDrawerProps) {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!direction) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-lens-cream/50">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-lens-gold" />
              <span className="text-sm font-medium text-gray-600">深度百科</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {/* Title */}
              <h2 className="text-2xl font-bold text-lens-dark mb-4">
                {direction.title}
              </h2>

              {/* Summary Section */}
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-lens-gold" />
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    方向总结
                  </h3>
                </div>
                <div className="bg-lens-gold/5 border-l-4 border-lens-gold rounded-r-lg p-4">
                  <p className="text-gray-700 leading-relaxed">
                    {direction.summary}
                  </p>
                </div>
              </div>

              {/* Full Explanation */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                  详细解读
                </h3>
                <div className="prose prose-gray max-w-none">
                  {direction.fullExplanation.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-600 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Related Terms */}
              {direction.relatedTerms.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center space-x-2 mb-3">
                    <Tag className="w-4 h-4 text-gray-400" />
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      相关术语
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {direction.relatedTerms.map((term, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-lens-gold/10 hover:text-lens-gold transition-colors cursor-pointer"
                      >
                        {term}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Links */}
              {direction.relatedLinks.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      延伸阅读
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {direction.relatedLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-lens-gold/5 transition-colors"
                      >
                        <div>
                          <p className="font-medium text-gray-800 group-hover:text-lens-dark transition-colors">
                            {link.title}
                          </p>
                          <p className="text-sm text-gray-400 mt-1">
                            {link.source}
                          </p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-lens-gold transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
            <button
              onClick={onClose}
              className="w-full py-3 bg-lens-dark text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
