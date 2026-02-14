'use client';

import Link from "next/link";
import { ArrowLeft, Plus } from 'lucide-react';
import QuizForm from "@/components/QuizForm";

export default function CreatePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-green-900/20">
            {/* ヘッダー */}
            <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                                <ArrowLeft className="w-6 h-6" />
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                ➕ キャラを追加
                            </h1>
                        </div>
                        <nav className="hidden md:flex space-x-8">
                            <Link
                                href="/"
                                className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium"
                            >
                                ホーム
                            </Link>
                            <Link
                                href="/characters"
                                className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium"
                            >
                                一覧
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* メインコンテンツ */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                            <Plus className="w-8 h-8 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                                新規キャラクター登録
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">
                                新しいキャラクターを作成して、データを追加しましょう。
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
                    <QuizForm />
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
