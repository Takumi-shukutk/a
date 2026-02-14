'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { LayoutGrid, List } from 'lucide-react';

export default function CharacterList({ tableName, gameName, gameColor }) {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [sortOrder, setSortOrder] = useState('default'); // 'default', 'name-asc', etc.

    const idColumnName = `${tableName}-id`;

    useEffect(() => {
        async function loadCharacters() {
            setLoading(true);
            setError(null);
            try {
                const { data, error: sbError } = await supabase
                    .from(tableName)
                    .select('*')
                    .order('name-jp', { ascending: true });

                if (sbError) {
                    setError(sbError.message);
                    setCharacters([]);
                } else if (data) {
                    setCharacters(data);
                }
            } catch (e) {
                setError(String(e));
                setCharacters([]);
            } finally {
                setLoading(false);
            }
        }

        loadCharacters();
    }, [tableName]);

    const sortedCharacters = [...characters].sort((a, b) => {
        if (sortOrder === 'default') {
            return a[idColumnName] - b[idColumnName];
        } else if (sortOrder === 'name-asc') {
            return a['name-jp'].localeCompare(b['name-jp'], 'ja');
        } else if (sortOrder === 'name-desc') {
            return b['name-jp'].localeCompare(a['name-jp'], 'ja');
        } else if (sortOrder === 'name-en-asc') {
            return a['name-en'].localeCompare(b['name-en']);
        } else if (sortOrder === 'name-en-desc') {
            return b['name-en'].localeCompare(a['name-en']);
        }
        return 0;
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">読み込み中...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg border border-red-300 dark:border-red-700">
                <p className="font-semibold">エラーが発生しました</p>
                <p className="text-sm mt-2">{error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* コントロールバー */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex-1">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            登録キャラクター: <span className="font-bold text-lg">{characters.length}</span> 体
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 flex-1 sm:justify-end">
                        {/* ソート */}
                        <div>
                            <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                並び替え
                            </label>
                            <select
                                id="sortOrder"
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="default">デフォルト (ID順)</option>
                                <option value="name-asc">日本語名 (昇順)</option>
                                <option value="name-desc">日本語名 (降順)</option>
                                <option value="name-en-asc">英語名 (昇順)</option>
                                <option value="name-en-desc">英語名 (降順)</option>
                            </select>
                        </div>

                        {/* ビューモード切り替え */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                表示方式
                            </label>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg border-2 transition-all ${
                                        viewMode === 'grid'
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                                    }`}
                                    title="グリッド表示"
                                >
                                    <LayoutGrid className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg border-2 transition-all ${
                                        viewMode === 'list'
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                                    }`}
                                    title="リスト表示"
                                >
                                    <List className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* グリッド表示 */}
            {viewMode === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {sortedCharacters.map((character) => (
                        <div
                            key={character[`${tableName}-id`]}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700 overflow-hidden"
                        >
                            <div className={`h-32 bg-gradient-to-br ${gameColor} opacity-80`}></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                                    {character['name-jp']}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                    {character['name-en']}
                                </p>
                                <div className="flex gap-2">
                                    <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-semibold">
                                        ID: {character[`${tableName}-id`]}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* リスト表示 */}
            {viewMode === 'list' && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className={`bg-gradient-to-r ${gameColor} text-white`}>
                                    <th className="px-6 py-4 text-left font-semibold">ID</th>
                                    <th className="px-6 py-4 text-left font-semibold">日本語名</th>
                                    <th className="px-6 py-4 text-left font-semibold">英語名</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {sortedCharacters.map((character, index) => (
                                    <tr
                                        key={character[`${tableName}-id`]}
                                        className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                                            index % 2 === 0
                                                ? 'bg-white dark:bg-gray-800'
                                                : 'bg-gray-50 dark:bg-gray-700/30'
                                        }`}
                                    >
                                        <td className="px-6 py-4 text-gray-900 dark:text-white font-semibold">
                                            {character[`${tableName}-id`]}
                                        </td>
                                        <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">
                                            {character['name-jp']}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                            {character['name-en']}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* キャラクターなし */}
            {sortedCharacters.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        まだキャラクターが登録されていません
                    </p>
                </div>
            )}
        </div>
    );
}
