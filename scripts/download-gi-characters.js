#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 保存ディレクトリ
const imageDirs = {
    gi: path.join(__dirname, '../public/images/gi'),
    hsr: path.join(__dirname, '../public/images/hsr'),
    zzz: path.join(__dirname, '../public/images/zzz'),
    wuwa: path.join(__dirname, '../public/images/wuwa'),
};

// ディレクトリを作成
Object.values(imageDirs).forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`✓ ディレクトリ作成: ${dir}`);
    }
});

// Genshin Impact キャラクター ID リスト（全122人）
const giCharacterIds = [
    10000002, 10000003, 10000005, 10000006, 10000007, 10000014, 10000015, 10000016, 10000020, 10000021,
    10000022, 10000023, 10000024, 10000025, 10000026, 10000027, 10000029, 10000030, 10000031, 10000032,
    10000033, 10000034, 10000035, 10000036, 10000037, 10000038, 10000039, 10000041, 10000042, 10000043,
    10000044, 10000045, 10000046, 10000047, 10000048, 10000049, 10000050, 10000051, 10000052, 10000053,
    10000054, 10000055, 10000056, 10000057, 10000058, 10000059, 10000060, 10000061, 10000062, 10000063,
    10000064, 10000065, 10000066, 10000067, 10000068, 10000069, 10000070, 10000071, 10000072, 10000073,
    10000074, 10000075, 10000076, 10000077, 10000078, 10000079, 10000080, 10000081, 10000082, 10000083,
    10000010, 10000011, 10000012, 10000013, 10000017, 10000018, 10000019, 10000028, 10000040, 10000084,
    10000085, 10000086, 10000087, 10000088, 10000089, 10000090, 10000091, 10000092, 10000093, 10000094,
    10000095, 10000096, 10000097, 10000098, 10000099, 10000100, 10000101, 10000102, 10000103, 10000104,
];

// CLI で画像をダウンロード
function downloadImage(url, filePath) {
    try {
        execSync(`curl -s -o "${filePath}" "${url}"`);
        return true;
    } catch (error) {
        return false;
    }
}

// Genshin Impact 画像ダウンロード
function downloadGICharacters() {
    console.log('\n🎮 Genshin Impact キャラクター画像ダウンロード開始...\n');
    
    let successCount = 0;
    let failCount = 0;

    for (const charId of giCharacterIds) {
        try {
            const imageUrl = `https://enka.network/ui/UI_AvatarIcon_${charId}.png`;
            const fileName = `${charId}.png`;
            const filePath = path.join(imageDirs.gi, fileName);

            // ファイルが既に存在する場合はスキップ
            if (fs.existsSync(filePath)) {
                console.log(`⊘ スキップ: ${fileName} (既存)`);
                continue;
            }

            if (downloadImage(imageUrl, filePath)) {
                successCount++;
                console.log(`✓ ダウンロード完了: ${fileName}`);
            } else {
                failCount++;
                console.log(`✗ ダウンロード失敗: ${fileName}`);
            }
        } catch (error) {
            failCount++;
            console.log(`✗ エラー: ${charId}`);
        }
    }

    console.log(`\n📊 GI ダウンロード結果: 成功 ${successCount}, 失敗 ${failCount}`);
}

// メイン処理
console.log('🚀 キャラクター画像ダウンロード開始\n');
downloadGICharacters();
console.log('\n✨ 完了！');
