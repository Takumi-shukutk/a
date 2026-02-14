'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function CharacterRegisterForm() {
    return (
        <Link
            href="/register"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
        >
            <Plus className="w-5 h-5" />
            キャラ登録
        </Link>
    );
}
