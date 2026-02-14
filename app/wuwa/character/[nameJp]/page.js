'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ArrowLeft } from 'lucide-react';

export default function WUWACharacterDetailPage() {
    const params = useParams();
    const nameJp = decodeURIComponent(params.nameJp);
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const { data, error: sbError } = await supabase
                    .from('WUWA_chara')
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
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">読み込み中...</p>
                </div>
            </div>
        );
    }

    if (error || !character) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
                <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <Link href="/wuwa" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 flex items-center gap-2">
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

    const imageUrl = `https://czmftjvxtosunimxhdzu.supabase.co/storage/v1/object/public/wuwa-icons/${character['name-en']}_icon.webp`;

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
            {/* ヘッダー */}
            <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <Link href="/wuwa" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 flex items-center gap-2">
                            <ArrowLeft className="w-6 h-6" />
                            キャラクター一覧に戻る
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            🌊 Wuthering Waves (WUWA)
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
                                        ID
                                    </h3>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {character['WUWA_chara-id']}
                                    </p>
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
