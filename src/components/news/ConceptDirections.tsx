'use client';

import { ConceptDirection } from '@/types';
import { Compass, ChevronRight, Star } from 'lucide-react';

interface ConceptDirectionsProps {
  directions: ConceptDirection[];
  onSelect: (direction: ConceptDirection) => void;
}

export default function ConceptDirections({ directions, onSelect }: ConceptDirectionsProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      {/* Section Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-lens-gold/10 rounded-xl flex items-center justify-center">
          <Compass className="w-5 h-5 text-lens-gold" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-lens-dark">概念方向探索</h2>
          <p className="text-xs text-gray-500">点击深入了解</p>
        </div>
      </div>

      {/* Direction Cards */}
      <div className="space-y-3">
        {directions.map((direction, index) => (
          <DirectionCard
            key={direction.id}
            direction={direction}
            index={index}
            onClick={() => onSelect(direction)}
          />
        ))}
      </div>
    </div>
  );
}

interface DirectionCardProps {
  direction: ConceptDirection;
  index: number;
  onClick: () => void;
}

function DirectionCard({ direction, index, onClick }: DirectionCardProps) {
  const importanceColors = {
    high: 'border-lens-gold/50 bg-gradient-to-r from-lens-gold/5 to-transparent',
    medium: 'border-gray-200 bg-gray-50/50',
    low: 'border-gray-200 bg-gray-50/50',
  };

  return (
    <button
      onClick={onClick}
      className={`group w-full text-left p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${importanceColors[direction.importance]}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 pr-2">
          <div className="flex items-center space-x-2 mb-1">
            {direction.importance === 'high' && (
              <Star className="w-3.5 h-3.5 text-lens-gold fill-lens-gold" />
            )}
            <h3 className="font-semibold text-lens-dark text-sm group-hover:text-lens-gold transition-colors">
              {direction.title}
            </h3>
          </div>
          <p className="text-xs text-gray-500 line-clamp-2">
            {direction.shortDescription}
          </p>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-lens-gold group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
      </div>
    </button>
  );
}
