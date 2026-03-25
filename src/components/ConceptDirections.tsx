'use client';

import { ConceptDirection } from '@/types';
import { Compass, ChevronRight, Star } from 'lucide-react';

interface ConceptDirectionsProps {
  directions: ConceptDirection[];
  onSelect: (direction: ConceptDirection) => void;
}

export default function ConceptDirections({ directions, onSelect }: ConceptDirectionsProps) {
  return (
    <section className="max-w-3xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-lens-gold/10 rounded-xl flex items-center justify-center">
          <Compass className="w-5 h-5 text-lens-gold" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-lens-dark">概念方向探索</h2>
          <p className="text-sm text-gray-500">点击卡片深入了解相关议题</p>
        </div>
      </div>

      {/* Direction Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {directions.map((direction, index) => (
          <DirectionCard
            key={direction.id}
            direction={direction}
            index={index}
            onClick={() => onSelect(direction)}
          />
        ))}
      </div>
    </section>
  );
}

interface DirectionCardProps {
  direction: ConceptDirection;
  index: number;
  onClick: () => void;
}

function DirectionCard({ direction, index, onClick }: DirectionCardProps) {
  const importanceColors = {
    high: 'border-lens-gold/50 bg-gradient-to-br from-lens-gold/5 to-transparent',
    medium: 'border-gray-200 bg-white',
    low: 'border-gray-200 bg-white',
  };

  return (
    <button
      onClick={onClick}
      className={`group relative w-full text-left p-5 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${importanceColors[direction.importance]}`}
    >
      {/* Index Badge */}
      <div className="absolute top-4 right-4 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-500 group-hover:bg-lens-gold group-hover:text-white transition-colors">
        {index + 1}
      </div>

      {/* Importance Indicator */}
      {direction.importance === 'high' && (
        <div className="absolute top-4 left-4">
          <Star className="w-4 h-4 text-lens-gold fill-lens-gold" />
        </div>
      )}

      {/* Content */}
      <div className={direction.importance === 'high' ? 'pt-6' : 'pt-2'}>
        <h3 className="text-lg font-semibold text-lens-dark mb-2 pr-8 group-hover:text-lens-gold transition-colors">
          {direction.title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          {direction.shortDescription}
        </p>
        
        {/* Explore Link */}
        <div className="flex items-center text-sm font-medium text-gray-400 group-hover:text-lens-gold transition-colors">
          <span>深度解读</span>
          <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-lens-gold/0 via-lens-gold/5 to-lens-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </button>
  );
}
