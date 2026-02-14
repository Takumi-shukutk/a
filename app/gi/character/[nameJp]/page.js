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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            } catch (err) {
                console.error('Error fetching character:', err);
                setError(err.message);
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
