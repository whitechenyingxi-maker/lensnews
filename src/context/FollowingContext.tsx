'use client';

import React, { createContext, useContext, useReducer, useEffect, useState, ReactNode } from 'react';

interface FollowingState {
  followingIds: string[];
}

type FollowingAction =
  | { type: 'FOLLOW'; payload: string }
  | { type: 'UNFOLLOW'; payload: string }
  | { type: 'LOAD_FROM_STORAGE'; payload: string[] };

interface FollowingContextType {
  followingIds: string[];
  follow: (newsId: string) => void;
  unfollow: (newsId: string) => void;
  isFollowing: (newsId: string) => boolean;
}

const FollowingContext = createContext<FollowingContextType | undefined>(undefined);

function followingReducer(state: FollowingState, action: FollowingAction): FollowingState {
  switch (action.type) {
    case 'FOLLOW':
      if (state.followingIds.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        followingIds: [...state.followingIds, action.payload],
      };
    case 'UNFOLLOW':
      return {
        ...state,
        followingIds: state.followingIds.filter((id) => id !== action.payload),
      };
    case 'LOAD_FROM_STORAGE':
      return {
        ...state,
        followingIds: action.payload,
      };
    default:
      return state;
  }
}

export function FollowingProvider({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [state, dispatch] = useReducer(followingReducer, { followingIds: [] });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('lens-news-following');
      if (stored) {
        const parsed = JSON.parse(stored);
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: parsed });
      }
    } catch (error) {
      console.error('Failed to load following list from storage:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('lens-news-following', JSON.stringify(state.followingIds));
      } catch (error) {
        console.error('Failed to save following list to storage:', error);
      }
    }
  }, [state.followingIds, isLoaded]);

  const follow = (newsId: string) => {
    dispatch({ type: 'FOLLOW', payload: newsId });
  };

  const unfollow = (newsId: string) => {
    dispatch({ type: 'UNFOLLOW', payload: newsId });
  };

  const isFollowing = (newsId: string) => {
    return state.followingIds.includes(newsId);
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <FollowingContext.Provider
      value={{
        followingIds: state.followingIds,
        follow,
        unfollow,
        isFollowing,
      }}
    >
      {children}
    </FollowingContext.Provider>
  );
}

export function useFollowing() {
  const context = useContext(FollowingContext);
  if (context === undefined) {
    throw new Error('useFollowing must be used within a FollowingProvider');
  }
  return context;
}
