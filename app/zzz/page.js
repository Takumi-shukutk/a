'use client';

import Link from "next/link";
import { ArrowLeft } from 'lucide-react';
import CharacterList from "@/components/CharacterList";
import CharacterRegisterForm from "@/components/CharacterRegisterForm";

export default function ZZZPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
            {/* ヘッダー */}
            <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                                <ArrowLeft className="w-6 h-6" />
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                🌙 Zenless Zone Zero (ZZZ)
                            </h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <CharacterRegisterForm />
                        </div>
                    </div>
                </div>
            </header>

            {/* メインコンテンツ */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Zenless Zone Zero キャラクター一覧
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        登録されているキャラクターを確認できます。グリッド表示とリスト表示を切り替えて表示できます。
                    </p>
                </div>

                <CharacterList 
                    tableName="ZZZ_chara" 
                    gameName="Zenless Zone Zero"
                    gameColor="from-purple-500 to-pink-500"
                />
            </main>

            {/* フッター */}
            <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
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
