'use client';

import Link from "next/link";
import { BookOpen, Plus, BarChart3, Settings } from 'lucide-react';
import CharacterRegisterForm from "@/components/CharacterRegisterForm";

export default function Home() {
    const features = [
        {
            icon: BookOpen,
            title: "GI",
            description: "Genshin Impactのキャラクターを確認できます",
            href: "/gi",
            color: "from-blue-500 to-cyan-500",
            bgColor: "bg-blue-50 dark:bg-blue-900/20"
        },
        {
            icon: Plus,
            title: "HSR",
            description: "Honkai: Star Railのキャラクターを確認できます",
            href: "/hsr",
            color: "from-yellow-500 to-orange-500",
            bgColor: "bg-yellow-50 dark:bg-yellow-900/20"
        },
        {
            icon: BarChart3,
            title: "ZZZ",
            description: "Zenless Zone Zeroのキャラクターを確認できます",
            href: "/zzz",
            color: "from-purple-500 to-pink-500",
            bgColor: "bg-purple-50 dark:bg-purple-900/20"
        },
        {
            icon: Settings,
            title: "WUWA",
            description: "Wuthering Wavesのキャラクターを確認できます",
            href: "/wuwa",
            color: "from-green-500 to-emerald-500",
            bgColor: "bg-green-50 dark:bg-green-900/20"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
            {/* ヘッダー */}
            <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center">
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                                📚 キャラクターハブ
                            </h1>
                        </div>
                        <CharacterRegisterForm />
                    </div>
                </div>
            </header>

            {/* メインコンテンツ */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* ウェルカムセクション */}
                <div className="text-center mb-20">
                    <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                        キャラクター学習へようこそ
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        キャラクターを学習・管理・共有できるプラットフォーム。
                        <br />
                        以下から始めましょう。
                    </p>
                </div>

                {/* フィーチャーボタングリッド */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                            <Link key={index} href={feature.href}>
                                <div className={`${feature.bgColor} p-8 rounded-2xl border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer h-full`}>
                                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
                                        <IconComponent className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {feature.description}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* クイックスタートセクション */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        🚀 クイックスタート
                    </h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold mb-4">
                                1
                            </div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2">キャラを作成</h4>
                            <p className="text-gray-600 dark:text-gray-400">新しいキャラクターを追加セクションから作成します</p>
                        </div>
                        <div>
                            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold mb-4">
                                2
                            </div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2">一覧で確認</h4>
                            <p className="text-gray-600 dark:text-gray-400">作成したキャラクターを一覧で確認できます</p>
                        </div>
                        <div>
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 font-bold mb-4">
                                3
                            </div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2">学習を進める</h4>
                            <p className="text-gray-600 dark:text-gray-400">クイズで楽しく学習を進めます</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* フッター */}
            <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-4">キャラクターハブ</h4>
                            <p className="text-gray-600 dark:text-gray-400">学習を楽しくするプラットフォーム</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-4">リンク</h4>
                            <div className="space-y-2">
                                <Link href="/characters" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                    キャラクター
                                </Link>
                                <br />
                                <Link href="/create" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                    作成
                                </Link>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-4">情報</h4>
                            <p className="text-gray-600 dark:text-gray-400">学習用プラットフォーム</p>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-8 text-center text-gray-600 dark:text-gray-400">
                        <p>
                            &copy; 2025 キャラクターハブ. 学習用に作成されました。
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
