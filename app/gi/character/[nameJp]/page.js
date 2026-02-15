'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ArrowLeft } from 'lucide-react';

export default function GICharacterDetailPage() {
    const params = useParams();
    const nameJp = decodeURIComponent(params.nameJp);
    const [character, setCharacter] = useState(null);
    const [characterStats, setCharacterStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState({ level: 1, ascended: false });

    const elementMap = {
        1: { name: '炎', color: 'from-red-500 to-orange-500', url: 'https://czmftjvxtosunimxhdzu.supabase.co/storage/v1/object/public/element-gi/Pyro.webp' },
        2: { name: '水', color: 'from-blue-500 to-cyan-500', url: 'https://czmftjvxtosunimxhdzu.supabase.co/storage/v1/object/public/element-gi/Hydro.webp' },
        3: { name: '風', color: 'from-green-500 to-teal-500', url: 'https://czmftjvxtosunimxhdzu.supabase.co/storage/v1/object/public/element-gi/Anemo.webp' },
        4: { name: '雷', color: 'from-purple-500 to-violet-500', url: 'https://czmftjvxtosunimxhdzu.supabase.co/storage/v1/object/public/element-gi/Electro.webp' },
        5: { name: '草', color: 'from-yellow-500 to-lime-500', url: 'https://czmftjvxtosunimxhdzu.supabase.co/storage/v1/object/public/element-gi/Dendro.webp' },
        6: { name: '氷', color: 'from-cyan-300 to-blue-300', url: 'https://czmftjvxtosunimxhdzu.supabase.co/storage/v1/object/public/element-gi/Cryo.webp' },
        7: { name: '岩', color: 'from-yellow-600 to-orange-600', url: 'https://czmftjvxtosunimxhdzu.supabase.co/storage/v1/object/public/element-gi/Geo.webp' },
    };

    const weaponTypeMap = {
        1: { name: '片手剣', url: 'https://czmftjvxtosunimxhdzu.supabase.co/storage/v1/object/public/weaponicon-gi/Sword.webp' },
        2: { name: '両手剣', url: 'https://czmftjvxtosunimxhdzu.supabase.co/storage/v1/object/public/weaponicon-gi/Claymore.webp' },
        3: { name: '長柄武器', url: 'https://czmftjvxtosunimxhdzu.supabase.co/storage/v1/object/public/weaponicon-gi/Polearm.webp' },
        4: { name: '弓', url: 'https://czmftjvxtosunimxhdzu.supabase.co/storage/v1/object/public/weaponicon-gi/Bow.webp' },
        5: { name: '法器', url: 'https://czmftjvxtosunimxhdzu.supabase.co/storage/v1/object/public/weaponicon-gi/Catalyst.webp' },
    };

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const { data, error: sbError } = await supabase
                    .from('GI_chara')
                    .select('*')
                    .eq('name-jp', nameJp)
                    .single();

                if (sbError) throw sbError;
                setCharacter(data);

                // Fetch character stats by GI_chara-id
                if (data && data['GI_chara-id']) {
                    const { data: statsData, error: statsError } = await supabase
                        .from('GI_chara-status')
                        .select('*')
                        .eq('GI_chara-id', data['GI_chara-id'])
                        .order('level', { ascending: true });

                    if (statsError) throw statsError;
                    setCharacterStats(statsData || []);
                    
                    // Set default level to the minimum available level
                    if (statsData && statsData.length > 0) {
                        const firstStat = statsData[0];
                        setSelectedLevel({ level: firstStat.level, ascended: firstStat.ascended === true });
                    }
                }
            } catch (err) {
                console.error('Error fetching character:', err);
                console.error('Full error:', JSON.stringify(err, null, 2));
                setError(err.message || JSON.stringify(err));
            } finally {
                setLoading(false);
            }
        };

        fetchCharacter();
    }, [nameJp]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">読み込み中...</p>
                </div>
            </div>
        );
    }

    if (error || !character) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
                <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <Link href="/gi" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2">
                                <ArrowLeft className="w-6 h-6" />
                                キャラクター一覧に戻る
                            </Link>
                        </div>
                    </div>
                </header>
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <p className="text-xl text-red-600 dark:text-red-400">
                            キャラクターが見つかりません: {error || nameJp}
                        </p>
                    </div>
                </main>
            </div>
        );
    }

    const travelerId = [1, 2, 3, 4, 38, 39, 57, 58, 76, 77, 101, 102];
    const imageUrl = travelerId.includes(character['GI_chara-id']) 
        ? 'https://czmftjvxtosunimxhdzu.supabase.co/storage/v1/object/public/icons-gi/Traveler_icon.webp'
        : `https://czmftjvxtosunimxhdzu.supabase.co/storage/v1/object/public/icons-gi/${character['name-en']}_icon.webp`;
    const element = elementMap[character.element];
    const weaponType = weaponTypeMap[character.weapontype];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            {/* ヘッダー */}
            <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <Link href="/gi" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2">
                            <ArrowLeft className="w-6 h-6" />
                            キャラクター一覧に戻る
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            🎮 Genshin Impact (GI)
                        </h1>
                        <div className="w-20"></div>
                    </div>
                </div>
            </header>

            {/* メインコンテンツ */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                        {/* 画像 */}
                        <div className="flex flex-col items-center justify-center">
                            <div className="w-full h-80 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-xl overflow-hidden flex items-center justify-center">
                                <img
                                    src={imageUrl}
                                    alt={character['name-jp']}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>
                        </div>

                        {/* キャラクター情報 */}
                        <div className="flex flex-col justify-center">
                            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                                {character['name-jp']}
                            </h2>
                            <p className="text-2xl text-gray-600 dark:text-gray-400 mb-8">
                                {character['name-en']}
                            </p>

                            {/* 基本情報 */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                                         属性
                                    </h3>
                                    {element && (
                                        <div className="flex items-center gap-3">
                                            <img 
                                                src={element.url} 
                                                alt={element.name}
                                                className="w-16 h-16 object-contain"
                                            />
                                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                                                {element.name}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                                        武器
                                    </h3>
                                    {weaponType && (
                                        <div className="flex items-center gap-3">
                                            <img 
                                                src={weaponType.url} 
                                                alt={weaponType.name}
                                                className="w-16 h-16 object-contain"
                                            />
                                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                                                {weaponType.name}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Character Stats Section */}
                {characterStats.length > 0 && (
                    <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden p-8">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                            キャラクタースタッツ
                        </h2>

                        {/* Level Selector */}
                        <div className="mb-8">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                                レベル・突破状況
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {characterStats.map((stat, index) => {
                                    const isSelected = selectedLevel.level === stat.level && selectedLevel.ascended === (stat.ascended === true);
                                    const ascensionLabel = stat.ascended ? '突破済み' : '未突破';
                                    
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedLevel({ level: stat.level, ascended: stat.ascended === true })}
                                            className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                                isSelected
                                                    ? 'bg-blue-600 text-white shadow-lg'
                                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600'
                                            }`}
                                        >
                                            Lv.{stat.level} <span className="text-xs ml-1">({ascensionLabel})</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Stats Table */}
                        {(() => {
                            // Find the stat data for the selected level and ascension
                            const statData = characterStats.find(
                                s => s.level === selectedLevel.level && (s.ascended === true) === selectedLevel.ascended
                            );
                            if (!statData) return null;

                            // Organize stats with true values on top, false on bottom
                            const allStats = [
                                { label: '基礎HP', value: statData['base-hp'], base: true, unit: '' },
                                { label: '基礎攻撃力', value: statData['base-atk'], base: true, unit: '' },
                                { label: '基礎防御力', value: statData['base-def'], base: true, unit: '' },
                                { label: 'HP%', value: statData['per-hp'], base: false, unit: '%' },
                                { label: '攻撃力%', value: statData['per-atk'], base: false, unit: '%' },
                                { label: '防御力%', value: statData['per-def'], base: false, unit: '%' },
                                { label: '会心率', value: statData['cr'], base: false, unit: '%' },
                                { label: '会心ダメージ', value: statData['cd'], base: false, unit: '%' },
                                { label: '元素熟知', value: statData['em'], base: false, unit: '' },
                            ];

                            // Filter out null values and sort: true (base) first, then false (non-base)
                            const sortedStats = [
                                ...allStats.filter(s => s.base && s.value !== null),
                                ...allStats.filter(s => !s.base && s.value !== null),
                            ];

                            return (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                    ステータス
                                                </th>
                                                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                    値
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sortedStats.map((stat, index) => {
                                                const baseCount = sortedStats.filter(s => s.base).length;
                                                const isBaseRow = index < baseCount;
                                                return (
                                                <tr
                                                    key={index}
                                                    className={`border-b border-gray-100 dark:border-gray-700 ${
                                                        isBaseRow
                                                            ? 'bg-blue-50 dark:bg-gray-700/50'
                                                            : 'bg-gray-50 dark:bg-gray-800/50'
                                                    } hover:bg-gray-100 dark:hover:bg-gray-700 transition`}
                                                >
                                                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                                                        {stat.label}
                                                    </td>
                                                    <td className="px-4 py-3 text-right font-mono text-sm font-semibold text-gray-900 dark:text-gray-100">
                                                        {stat.value}{stat.unit}
                                                    </td>
                                                </tr>
                                            );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            );
                        })()}
                    </div>
                )}
            </main>

            {/* フッター */}
            <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                        © 2024 Character Database. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
