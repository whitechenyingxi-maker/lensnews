'use client';

import { useFollowing } from '@/context/FollowingContext';
import { Bookmark, BookmarkCheck } from 'lucide-react';

interface FollowButtonProps {
  newsId: string;
  size?: 'sm' | 'md';
  showText?: boolean;
}

export default function FollowButton({ newsId, size = 'md', showText = true }: FollowButtonProps) {
  const { isFollowing, follow, unfollow } = useFollowing();
  const following = isFollowing(newsId);

  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  const buttonClass = size === 'sm' 
    ? 'px-3 py-1.5 text-sm' 
    : 'px-4 py-2 text-sm';

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (following) {
      unfollow(newsId);
    } else {
      follow(newsId);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center space-x-1.5 rounded-lg font-medium transition-all duration-200 ${
        following
          ? 'bg-lens-gold/10 text-lens-gold hover:bg-lens-gold/20'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      } ${buttonClass}`}
    >
      {following ? (
        <BookmarkCheck className={iconSize} />
      ) : (
        <Bookmark className={iconSize} />
      )}
      {showText && <span>{following ? '已关注' : '关注'}</span>}
    </button>
  );
}
