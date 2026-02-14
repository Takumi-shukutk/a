'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function RegisterPage() {
    const [selectedGame, setSelectedGame] = useState('GI');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        nameEn: '',
        nameJp: ''
    });

    const games = [
        { id: 'GI', label: 'Genshin Impact', table: 'GI_chara', icon: '🎮', color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-50 dark:bg-blue-900/20', hoverColor: 'hover:text-blue-600 dark:hover:text-blue-400' },
        { id: 'HSR', label: 'Honkai: Star Rail', table: 'HSR_chara', icon: '⭐', color: 'from-yellow-500 to-orange-500', bgColor: 'bg-yellow-50 dark:bg-yellow-900/20', hoverColor: 'hover:text-yellow-600 dark:hover:text-yellow-400' },
        { id: 'ZZZ', label: 'Zenless Zone Zero', table: 'ZZZ_chara', icon: '🌙', color: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-50 dark:bg-purple-900/20', hoverColor: 'hover:text-purple-600 dark:hover:text-purple-400' },
        { id: 'WUWA', label: 'Wuthering Waves', table: 'WUWA_chara', icon: '🌊', color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-50 dark:bg-green-900/20', hoverColor: 'hover:text-green-600 dark:hover:text-green-400' }
    ];

    const currentGame = games.find(g => g.id === selectedGame);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // バリデーション
            if (!formData.nameEn.trim() || !formData.nameJp.trim()) {
                setError('英語名と日本語名の両方を入力してください');
                setLoading(false);
                return;
            }

            const tableName = currentGame.table;
            const idColumnName = `${tableName}-id`;

            // テーブルから最大 ID を取得
            const { data: maxData, error: maxError } = await supabase
                .from(tableName)
                .select(idColumnName)
                .order(idColumnName, { ascending: false })
                .limit(1);

            if (maxError && maxError.code !== 'PGRST116') {
                throw maxError;
            }

            // 次の ID を決定
            const nextId = (maxData && maxData.length > 0) ? (maxData[0][idColumnName] || 0) + 1 : 1;

            // Supabase にデータを登録
            const insertData = {
                [idColumnName]: nextId,
                'name-en': formData.nameEn.trim(),
                'name-jp': formData.nameJp.trim()
            };

            const { data, error: sbError } = await supabase
                .from(tableName)
                .insert([insertData])
                .select();

            if (sbError) {
                setError(`エラー: ${sbError.message}`);
                console.error('Supabase error:', sbError);
            } else {
                setSuccess(`${currentGame.label} にキャラクター「${formData.nameJp}」を登録しました！`);
                // フォーム初期化
                setFormData({
                    nameEn: '',
                    nameJp: ''
                });
            }
        } catch (err) {
            setError(`エラー: ${String(err)}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
            {/* ヘッダー */}
            <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                <ArrowLeft className="w-6 h-6" />
                            </Link>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                                ✨ キャラクター登録
                            </h1>
                        </div>
                    </div>
                </div>
            </header>

            {/* メインコンテンツ */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* ゲーム選択 */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        ゲームを選択
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {games.map((game) => (
                            <button
                                key={game.id}
                                onClick={() => {
                                    setSelectedGame(game.id);
                                    setError('');
                                    setSuccess('');
                                }}
                                className={`p-6 rounded-2xl border-2 transition-all ${
                                    selectedGame === game.id
                                        ? `border-gray-800 dark:border-white ${game.bgColor} shadow-xl scale-105`
                                        : `border-gray-300 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-400`
                                }`}
                            >
                                <div className="text-4xl mb-2">{game.icon}</div>
                                <h3 className="font-bold text-gray-900 dark:text-white">{game.id}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{game.label}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 登録フォーム */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="text-5xl">{currentGame.icon}</div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {currentGame.label}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                新しいキャラクターを登録します
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* 英語名入力 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                英語名 (name-en)
                            </label>
                            <input
                                type="text"
                                name="nameEn"
                                value={formData.nameEn}
                                onChange={handleChange}
                                placeholder="例: Fischl"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-lg"
                            />
                        </div>

                        {/* 日本語名入力 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                日本語名 (name-jp)
                            </label>
                            <input
                                type="text"
                                name="nameJp"
                                value={formData.nameJp}
                                onChange={handleChange}
                                placeholder="例: フィッシュル"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-lg"
                            />
                        </div>

                        {/* エラーメッセージ */}
                        {error && (
                            <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm border border-red-300 dark:border-red-700">
                                ❌ {error}
                            </div>
                        )}

                        {/* 成功メッセージ */}
                        {success && (
                            <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm border border-green-300 dark:border-green-700">
                                ✓ {success}
                            </div>
                        )}

                        {/* ボタン */}
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`flex-1 px-6 py-3 bg-gradient-to-r ${currentGame.color} text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg`}
                            >
                                {loading ? '登録中...' : 'キャラクターを登録'}
                            </button>
                            <Link
                                href="/"
                                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all text-lg"
                            >
                                キャンセル
                            </Link>
                        </div>
                    </form>
                </div>

                {/* ガイド */}
                <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        📝 登録のコツ
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2">英語名について</h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                キャラクターの公式英語名を入力してください。ゲーム内での表記に合わせてください。
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2">日本語名について</h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                キャラクターの日本語名を入力してください。ゲーム内での表記に合わせてください。
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2">ID について</h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                ID は自動的に付与されます。テーブル内の最大 ID + 1 になります。
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2">複数登録</h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                1つのキャラクターを登録した後、そのまま別のキャラクターを登録できます。
                            </p>
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
