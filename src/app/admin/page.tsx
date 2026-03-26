'use client';

import { useState, useEffect } from 'react';
import { Eye, Trash2, Save, ArrowRight, Clock, Link2, Check, Loader2, AlertCircle } from 'lucide-react';

interface NewsRecord {
  id: string;
  url: string;
  title: string;
  analysis: any;
  selectedViewpoints: any[];
  tempSelectedViewpoints: string[];
  isSaved: boolean;
  createdAt: string;
  status: 'pending' | 'analyzing' | 'completed' | 'failed';
}

export default function AdminPage() {
  const [url, setUrl] = useState('');
  const [records, setRecords] = useState<NewsRecord[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [expandedViewpoints, setExpandedViewpoints] = useState<{ [key: string]: boolean }>({});


  // 加载记录
  useEffect(() => {
    const savedRecords = localStorage.getItem('lens-news-admin-records');
    if (savedRecords) {
      const parsedRecords = JSON.parse(savedRecords);
      const processedRecords = parsedRecords.map((record: any) => ({
        ...record,
        tempSelectedViewpoints: [],
        isSaved: record.isSaved || false
      }));
      setRecords(processedRecords);
    }
  }, []);

  // 保存记录到本地存储
  useEffect(() => {
    if (records.length > 0) {
      localStorage.setItem('lens-news-admin-records', JSON.stringify(records));
    }
  }, [records]);

  // 提交新闻链接
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('请输入新闻链接');
      return;
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      setError('请输入有效的 URL');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const newRecord: NewsRecord = {
        id: Date.now().toString(),
        url,
        title: '分析中...',
        analysis: null,
        selectedViewpoints: [],
        tempSelectedViewpoints: [],
        isSaved: false,
        createdAt: new Date().toISOString(),
        status: 'analyzing'
      };

      setRecords([newRecord, ...records]);
      setUrl('');

      const response = await fetch('/api/analyze-news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setRecords(prev => prev.map(record => 
          record.id === newRecord.id 
            ? { ...record, status: 'failed' }
            : record
        ));
        setError(result.error || '分析失败，请重试');
        return;
      }

      setRecords(prev => prev.map(record => 
        record.id === newRecord.id 
          ? { 
              ...record, 
              status: 'completed', 
              analysis: result.data.analysis, 
              title: result.data.title,
              tempSelectedViewpoints: [], 
              isSaved: false 
            }
          : record
      ));

    } catch (error) {
      console.error('分析失败:', error);
      setError('分析失败，请检查网络连接后重试');
    } finally {
      setIsSubmitting(false);
    }
  };



  // 删除记录
  const handleDeleteRecord = (id: string) => {
    if (confirm('确定要删除这条记录吗？')) {
      setRecords(prev => prev.filter(record => record.id !== id));
    }
  };

  return (
    <main className="min-h-screen bg-lens-cream p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-lens-dark mb-2">管理员控制台</h1>
          <p className="text-gray-600">输入财经新闻链接，系统将自动分析并生成多维度视角</p>
        </div>

        {/* 输入表单 */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Link2 className="w-5 h-5 mr-2 text-lens-gold" />
            输入新闻链接
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="url"
                placeholder="请输入财经新闻链接"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lens-gold focus:border-lens-gold outline-none"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-lens-gold text-white font-medium rounded-lg hover:bg-amber-500 transition-colors flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    分析中...
                  </>
                ) : (
                  <>
                    开始分析
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </div>
            {error && (
              <div className="flex items-center text-red-500">
                <AlertCircle className="w-4 h-4 mr-2" />
                {error}
              </div>
            )}
          </form>
        </div>

        {/* 记录列表 */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-lens-gold" />
            分析记录
          </h2>
          
          {records.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Eye className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>暂无分析记录</p>
            </div>
          ) : (
            <div className="space-y-4">
              {records.map((record) => (
                <div key={record.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center mb-2">
                          <span 
                            className={`inline-block px-3 py-1 text-xs font-medium rounded-full mr-3 ${
                              record.status === 'completed' ? 'bg-green-100 text-green-800'
                              : record.status === 'analyzing' ? 'bg-blue-100 text-blue-800'
                              : record.status === 'failed' ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {record.status === 'completed' ? '已完成' : 
                             record.status === 'analyzing' ? '分析中' :
                             record.status === 'failed' ? '失败' : '待处理'}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(record.createdAt).toLocaleString('zh-CN')}
                          </span>
                          {record.isSaved && (
                            <span className="ml-2 text-lens-gold text-sm">
                              ✓ 已保存
                            </span>
                          )}
                        </div>
                        <h3 className="font-medium text-lens-dark mb-1">{record.title}</h3>
                        <p className="text-sm text-gray-600 mb-3 truncate overflow-hidden">{record.url}</p>
                      </div>
                      <div className="flex flex-shrink-0">
                        <button
                          onClick={() => handleDeleteRecord(record.id)}
                          className="p-2 text-gray-600 hover:text-red-500 hover:bg-gray-100 rounded"
                          title="删除记录"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {/* 直接显示维度 */}
                    {record.status === 'completed' && record.analysis?.viewpoints && (
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <Check className="w-4 h-4 mr-1 text-green-500" />
                          已生成 {record.analysis.viewpoints.length} 个维度分析
                          {record.tempSelectedViewpoints.length > 0 && (
                            <span className="ml-2 text-green-600">
                              (已选择 {record.tempSelectedViewpoints.length} 个)
                            </span>
                          )}
                        </div>
                        
                        {/* 维度列表 */}
                        <div className="space-y-2">
                          {record.analysis.viewpoints.map((viewpoint: any) => {
                            const isSelected = record.tempSelectedViewpoints.includes(viewpoint.id);
                            const isAlreadyAdded = record.selectedViewpoints.some((vp: any) => vp.id === viewpoint.id);
                            return (
                              <div key={viewpoint.id} className={`p-3 rounded ${isSelected ? 'bg-lens-gold/5 border border-lens-gold' : 'border border-gray-100'} ${isAlreadyAdded ? 'bg-green-50' : ''}`}>
                                <div className="flex items-start">
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => {
                                      const currentSelected = record.tempSelectedViewpoints || [];
                                      const newSelected = currentSelected.includes(viewpoint.id)
                                        ? currentSelected.filter(id => id !== viewpoint.id)
                                        : [...currentSelected, viewpoint.id];
                                      
                                      setRecords(prev => prev.map(r => 
                                        r.id === record.id 
                                          ? { ...r, tempSelectedViewpoints: newSelected }
                                          : r
                                      ));
                                    }}
                                    className="mr-3 h-4 w-4 text-lens-gold focus:ring-lens-gold mt-1"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center">
                                        <span className="font-medium text-sm text-lens-dark truncate">{viewpoint.title}</span>
                                        <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 rounded">{viewpoint.dimension}</span>
                                        {isAlreadyAdded && (
                                          <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded flex items-center">
                                            <Check className="w-3 h-3 mr-1" />
                                            已添加
                                          </span>
                                        )}
                                      </div>
                                      <button
                                        onClick={() => {
                                          setExpandedViewpoints(prev => ({
                                            ...prev,
                                            [`${record.id}-${viewpoint.id}`]: !prev[`${record.id}-${viewpoint.id}`]
                                          }));
                                        }}
                                        className="text-gray-500 hover:text-lens-gold text-xs"
                                      >
                                        {expandedViewpoints[`${record.id}-${viewpoint.id}`] ? '收起' : '展开'}
                                      </button>
                                    </div>
                                    <div className={`text-xs text-gray-600 mt-2 ${expandedViewpoints[`${record.id}-${viewpoint.id}`] ? '' : 'line-clamp-2'}`}>
                                      {viewpoint.insight}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        
                        {/* 保存按钮 */}
                        <div className="flex justify-end">
                          <button
                            onClick={() => {
                              const selectedViewpointsData = record.analysis.viewpoints.filter(
                                (vp: any) => record.tempSelectedViewpoints.includes(vp.id)
                              );
                              
                              setRecords(prev => prev.map(r => 
                                r.id === record.id 
                                  ? { ...r, selectedViewpoints: selectedViewpointsData, isSaved: true }
                                  : r
                              ));
                            }}
                            disabled={record.tempSelectedViewpoints.length === 0}
                            className={`px-4 py-2 rounded-lg flex items-center font-medium transition-colors ${
                              record.tempSelectedViewpoints.length > 0
                                ? 'bg-lens-gold text-white hover:bg-amber-500'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            <Save className="w-4 h-4 mr-2" />
                            保存并添加到主页
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>


      </div>
    </main>
  );
}
