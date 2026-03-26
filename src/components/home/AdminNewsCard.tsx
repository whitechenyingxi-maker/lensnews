import Link from 'next/link';
import { Eye, Clock, Tag } from 'lucide-react';

interface AdminNewsCardProps {
  news: {
    id: string;
    url: string;
    title: string;
    selectedViewpoints: any[];
    createdAt: string;
  };
}

export default function AdminNewsCard({ news }: AdminNewsCardProps) {
  return (
    <div className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-lens-gold/10 text-lens-gold rounded-full">
            财经
          </span>
          <span className="ml-3 text-sm text-gray-500 flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {new Date(news.createdAt).toLocaleDateString('zh-CN')}
          </span>
        </div>
        <Link
          href={`/topic/${news.id}`}
          className="p-2 text-gray-400 hover:text-lens-gold hover:bg-gray-100 rounded-lg transition-colors"
          title="查看详情"
        >
          <Eye className="w-4 h-4" />
        </Link>
      </div>

      <Link href={`/topic/${news.id}`} className="block">
        <h3 className="text-xl font-bold text-lens-dark mb-3 line-clamp-2 group-hover:text-lens-gold transition-colors cursor-pointer">
          {news.title}
        </h3>
      </Link>

      {news.selectedViewpoints.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">深度分析维度：</p>
          <div className="flex flex-wrap gap-2">
            {news.selectedViewpoints.map((viewpoint) => (
              <span key={viewpoint.id} className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                {viewpoint.dimension}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center">
          <Tag className="w-4 h-4 text-gray-400 mr-2" />
          <span className="text-sm text-gray-500">Lens News 分析</span>
        </div>
        <Link
          href={`/topic/${news.id}`}
          className="text-sm font-medium text-lens-gold hover:text-amber-600 transition-colors"
        >
          查看详情 →
        </Link>
      </div>
    </div>
  );
}
