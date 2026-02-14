'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { LayoutGrid, List } from 'lucide-react';

export default function CharacterList({ tableName, gameName, gameColor, storagePath, hasElement = false, gameRoute = '/' }) {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [sortOrder, setSortOrder] = useState('default'); // 'default', 'name-asc', etc.

    const idColumnName = `${tableName}-id`;

    // 元素マップ（GI用）
    const elementMap = {
        1: { name: '炎', color: 'from-red-500 to-orange-500', url: 'https://czmftjvxtosunimxhdzu.supabase.co/storage/v1/object/public/element-gi/Pyro.webp' },
        2: { name: '水', color: 'from-blue-500 to-cyan-500', url: 'https://czmftjvxtosunimxhdzu.supabase.co/storage/v1/object/public/element-gi/Hydro.webp' },
        3: { name: '風', color: 'from-green-500 to-teal-500', url: 'https://czmftjvxtosunimxhdzu.supabase.co/storage/v1/object/public/element-gi/Anemo.webp' },
        4: { name: '雷', color: 'from-purple-500 to-violet-500', url: 'https://czmftjvxtosunimxhdzu.supabase.co/storage/v1/object/public/element-gi/Electro.webp' },
        5: { name: '草', color: 'from-yellow-500 to-lime-500', url: 'https://czmftjvxtosunimxhdzu.supabase.co/storage/v1/object/public/element-gi/Dendro.webp' },
        6: { name: '氷', color: 'from-cyan-300 to-blue-300', url: 'https://czmftjvxtosunimxhdzu.supabase.co/storage/v1/object/public/element-gi/Cryo.webp' },
        7: { name: '岩', color: 'from-yellow-600 to-orange-600', url: 'https://czmftjvxtosunimxhdzu.supabase.co/storage/v1/object/public/element-gi/Geo.webp' },
    };

    // 武器タイプマップ（GI用）
    const weaponTypeMap = {
        1: { name: '片手剣', url: 'https://czmftjvxtosunimxhdzu.supabase.co/storage/v1/object/public/weaponicon-gi/Sword.webp' },
        2: { name: '両手剣', url: 'https://czmftjvxtosunimxhdzu.supabase.co/storage/v1/object/public/weaponicon-gi/Claymore.webp' },
        3: { name: '長柄武器', url: 'https://czmftjvxtosunimxhdzu.supabase.co/storage/v1/object/public/weaponicon-gi/Polearm.webp' },
        4: { name: '弓', url: 'https://czmftjvxtosunimxhdzu.supabase.co/storage/v1/object/public/weaponicon-gi/Bow.webp' },
        5: { name: '法器', url: 'https://czmftjvxtosunimxhdzu.supabase.co/storage/v1/object/public/weaponicon-gi/Catalyst.webp' },
    };

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
                    {sortedCharacters.map((character) => {
                        const travelerId = [1, 2, 3, 4, 38, 39, 57, 58, 76, 77, 101, 102];
                        const isTraveler = tableName === 'GI_chara' && travelerId.includes(character[`${tableName}-id`]);
                        const imageUrl = isTraveler
                            ? 'https://czmftjvxtosunimxhdzu.supabase.co/storage/v1/object/public/icons-gi/Traveler_icon.webp'
                            : `https://czmftjvxtosunimxhdzu.supabase.co/storage/v1/object/public/${storagePath}/${character['name-en']}_icon.webp`;
                        const element = hasElement ? elementMap[character.element] : null;
                        const weaponType = hasElement ? weaponTypeMap[character.weapontype] : null;
                        const characterLink = `${gameRoute}/character/${encodeURIComponent(character['name-jp'])}`;
                        return (
                            <Link
                                key={character[`${tableName}-id`]}
                                href={characterLink}
                            >
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 overflow-hidden group cursor-pointer hover:scale-105 hover:border-gray-400 dark:hover:border-gray-500">
                                    {/* 画像エリア */}
                                    <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 overflow-hidden group-hover:scale-110 transition-transform">
                                        <img
                                            src={imageUrl}
                                            alt={character['name-jp']}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                                            {character['name-jp']}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                            {character['name-en']}
                                        </p>
                                        <div className="flex gap-2 flex-wrap items-center">
                                            <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-semibold">
                                                ID: {character[`${tableName}-id`]}
                                            </span>
                                            {element && (
                                                <img 
                                                    src={element.url}
                                                    alt={element.name}
                                                    className="w-6 h-6 object-contain"
                                                />
                                            )}
                                            {weaponType && (
                                                <img 
                                                    src={weaponType.url}
                                                    alt={weaponType.name}
                                                    className="w-6 h-6 object-contain"
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
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
                                    {hasElement && <th className="px-6 py-4 text-left font-semibold">元素</th>}
                                    {hasElement && <th className="px-6 py-4 text-left font-semibold">武器</th>}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {sortedCharacters.map((character, index) => {
                                    const element = hasElement ? elementMap[character.element] : null;
                                    const weaponType = hasElement ? weaponTypeMap[character.weapontype] : null;
                                    const characterLink = `${gameRoute}/character/${encodeURIComponent(character['name-jp'])}`;
                                    return (
                                        <tr
                                            key={character[`${tableName}-id`]}
                                            className={`hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer ${
                                                index % 2 === 0
                                                    ? 'bg-white dark:bg-gray-800'
                                                    : 'bg-gray-50 dark:bg-gray-700/30'
                                            }`}
                                            onClick={() => window.location.href = characterLink}
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
                                            {hasElement && (
                                                <td className="px-6 py-4">
                                                    {element && (
                                                        <div className="flex items-center gap-2">
                                                            <img 
                                                                src={element.url}
                                                                alt={element.name}
                                                                className="w-6 h-6 object-contain"
                                                            />
                                                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                                                {element.name}
                                                            </span>
                                                        </div>
                                                    )}
                                                </td>
                                            )}
                                            {hasElement && (
                                                <td className="px-6 py-4">
                                                    {weaponType && (
                                                        <div className="flex items-center gap-2">
                                                            <img 
                                                                src={weaponType.url}
                                                                alt={weaponType.name}
                                                                className="w-6 h-6 object-contain"
                                                            />
                                                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                                                {weaponType.name}
                                                            </span>
                                                        </div>
                                                    )}
                                                </td>
                                            )}
                                        </tr>
                                    );
                                })}
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
