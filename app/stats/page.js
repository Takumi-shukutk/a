'use client';

import Link from "next/link";
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function StatsPage() {
    // サンプルデータ
    const weeklyData = [
        { day: '月', 学習時間: 30, 完了: 5 },
        { day: '火', 学習時間: 45, 完了: 7 },
        { day: '水', 学習時間: 35, 完了: 6 },
        { day: '木', 学習時間: 50, 完了: 8 },
        { day: '金', 学習時間: 60, 完了: 10 },
        { day: '土', 学習時間: 55, 完了: 9 },
        { day: '日', 学習時間: 40, 完了: 7 },
    ];

    const categoryData = [
        { name: '基本問題', value: 40 },
        { name: '中級問題', value: 30 },
        { name: '上級問題', value: 20 },
        { name: 'チャレンジ', value: 10 },
    ];

    const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

    const stats = [
        {
            label: '総学習時間',
            value: '315分',
            icon: '⏱️',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            label: '完了したクイズ',
            value: '52個',
            icon: '✅',
            color: 'from-green-500 to-emerald-500'
        },
        {
            label: '平均正解率',
            value: '82%',
            icon: '🎯',
            color: 'from-purple-500 to-pink-500'
        },
        {
            label: '連続学習日数',
            value: '7日',
            icon: '🔥',
            color: 'from-orange-500 to-red-500'
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-red-900/20">
            {/* ヘッダー */}
            <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400">
                                <ArrowLeft className="w-6 h-6" />
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                📊 統計情報
                            </h1>
                        </div>
                    </div>
                </div>
            </header>

            {/* メインコンテンツ */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* ウェルカムセクション */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <div className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                            <TrendingUp className="w-12 h-12 text-orange-600 dark:text-orange-400" />
                        </div>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        学習進捗を確認しよう
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        あなたの学習履歴と進捗状況をグラフで視覚化しました。
                        <br />
                        モチベーションを保ちながら学習を続けましょう。
                    </p>
                </div>

                {/* 統計カード */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, index) => (
                        <div key={index} className={`bg-gradient-to-br ${stat.color} rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-shadow`}>
                            <div className="text-4xl mb-2">{stat.icon}</div>
                            <p className="text-white/80 mb-2">{stat.label}</p>
                            <h3 className="text-4xl font-bold">{stat.value}</h3>
                        </div>
                    ))}
                </div>

                {/* グラフセクション */}
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    {/* 週間学習時間 */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            📈 週間学習時間
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={weeklyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="学習時間" fill="#8b5cf6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* クイズ難易度分布 */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            🎯 難易度別完了状況
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, value }) => `${name} ${value}`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 成績推移 */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 mb-12">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        📉 正解率推移
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={weeklyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="完了" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* アチーブメント */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        🏆 アチーブメント
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="flex items-center gap-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-2 border-yellow-300 dark:border-yellow-700">
                            <div className="text-4xl">🥇</div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white">1週間チャレンジ</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">1週間連続学習達成！</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-blue-300 dark:border-blue-700">
                            <div className="text-4xl">💯</div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white">完璧な成績</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">1つのクイズで満点達成！</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-2 border-purple-300 dark:border-purple-700">
                            <div className="text-4xl">🚀</div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white">スピードランナー</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">全難易度をクリア！</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* フッター */}
            <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center text-gray-600 dark:text-gray-400">
                        <p>
                            &copy; 2025 キャラクターハブ. 学習用に作成されました。
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
