'use client';

import Link from "next/link";
import { ArrowLeft, Lightbulb } from 'lucide-react';
import { useState } from 'react';

export default function QuizPage() {
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);

    const quizzes = [
        {
            id: 1,
            title: "基本問題",
            description: "キャラクターの基本情報についての問題です。初心者向け。",
            difficulty: "easy",
            color: "from-green-500 to-emerald-500",
            bgColor: "bg-green-50 dark:bg-green-900/20",
            questions: 10
        },
        {
            id: 2,
            title: "中級問題",
            description: "より詳しいキャラクター情報についての問題です。中級者向け。",
            difficulty: "medium",
            color: "from-yellow-500 to-orange-500",
            bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
            questions: 15
        },
        {
            id: 3,
            title: "上級問題",
            description: "深い内容を含むキャラクター情報についての問題です。上級者向け。",
            difficulty: "hard",
            color: "from-red-500 to-pink-500",
            bgColor: "bg-red-50 dark:bg-red-900/20",
            questions: 20
        },
        {
            id: 4,
            title: "チャレンジ",
            description: "全カテゴリーからランダムに出題されるチャレンジクイズです。",
            difficulty: "challenge",
            color: "from-purple-500 to-pink-500",
            bgColor: "bg-purple-50 dark:bg-purple-900/20",
            questions: 50
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-pink-900/20">
            {/* ヘッダー */}
            <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                                <ArrowLeft className="w-6 h-6" />
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                ✨ クイズ・学習
                            </h1>
                        </div>
                    </div>
                </div>
            </header>

            {/* メインコンテンツ */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* イントロセクション */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                            <Lightbulb className="w-12 h-12 text-purple-600 dark:text-purple-400" />
                        </div>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        楽しく学習しよう
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        難易度別のクイズで、キャラクターについての知識を深めることができます。
                        <br />
                        自分のレベルに合わせて挑戦してください。
                    </p>
                </div>

                {/* クイズカードグリッド */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {quizzes.map((quiz) => (
                        <div
                            key={quiz.id}
                            className={`${quiz.bgColor} p-8 rounded-2xl border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-xl hover:scale-105`}
                        >
                            <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${quiz.color} mb-4`}>
                                <Lightbulb className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                {quiz.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                {quiz.description}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="inline-block px-4 py-2 bg-white dark:bg-gray-800 rounded-lg text-gray-900 dark:text-white font-semibold">
                                    {quiz.questions}問
                                </span>
                                <button className={`px-6 py-2 bg-gradient-to-r ${quiz.color} text-white rounded-lg font-bold hover:shadow-lg transition-all`}>
                                    スタート
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 指示セクション */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        📋 クイズの進め方
                    </h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold mb-4">
                                1
                            </div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2">難易度を選択</h4>
                            <p className="text-gray-600 dark:text-gray-400">自分のレベルに合わせて難易度を選びます</p>
                        </div>
                        <div>
                            <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center text-pink-600 dark:text-pink-400 font-bold mb-4">
                                2
                            </div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2">問題を解く</h4>
                            <p className="text-gray-600 dark:text-gray-400">出題される問題に答えていきます</p>
                        </div>
                        <div>
                            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold mb-4">
                                3
                            </div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2">成績を確認</h4>
                            <p className="text-gray-600 dark:text-gray-400">学習履歴と成績が統計情報に反映されます</p>
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
