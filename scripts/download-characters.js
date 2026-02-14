#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// 保存ディレクトリ
const imageDirGI = path.join(__dirname, '../public/images/gi');
const imageDirHSR = path.join(__dirname, '../public/images/hsr');
const imageDirZZZ = path.join(__dirname, '../public/images/zzz');
const imageDirWUWA = path.join(__dirname, '../public/images/wuwa');

// ディレクトリを作成
[imageDirGI, imageDirHSR, imageDirZZZ, imageDirWUWA].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`✓ ディレクトリ作成: ${dir}`);
    }
});

// URLからファイルをダウンロード
function downloadFile(url, filePath) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;
        
        protocol.get(url, (response) => {
            if (response.statusCode === 200) {
                const fileStream = fs.createWriteStream(filePath);
                response.pipe(fileStream);
                fileStream.on('finish', () => {
                    fileStream.close();
                    resolve();
                });
                fileStream.on('error', reject);
            } else {
                reject(new Error(`Status: ${response.statusCode}`));
            }
        }).on('error', reject);
    });
}

// Genshin Impact キャラクター画像をダウンロード
async function downloadGICharacters() {
    console.log('\n🎮 Genshin Impact キャラクター画像ダウンロード開始...\n');
    
    try {
        // Enka.network から GI キャラデータを取得
        const response = await fetch('https://cdn.jsdelivr.net/npm/genshin-db@latest/TextMap/EN.json');
        if (!response.ok) throw new Error('Enka API error');
        
        const characters = [
            // 主要キャラクター ID (GI)
            10000002, 10000003, 10000005, 10000006, 10000007, 10000014, 10000015, 10000016, 10000020, 10000021,
            10000022, 10000023, 10000024, 10000025, 10000026, 10000027, 10000029, 10000030, 10000031, 10000032,
            10000033, 10000034, 10000035, 10000036, 10000037, 10000038, 10000039, 10000041, 10000042, 10000043,
            10000044, 10000045, 10000046, 10000047, 10000048, 10000049, 10000050, 10000051, 10000052, 10000053,
            10000054, 10000055, 10000056, 10000057, 10000058, 10000059, 10000060, 10000061, 10000062, 10000063,
            10000064, 10000065, 10000066, 10000067, 10000068, 10000069, 10000070, 10000071, 10000072, 10000073,
            10000074, 10000075, 10000076, 10000077, 10000078, 10000079, 10000080, 10000081, 10000082, 10000083,
        ];

        let successCount = 0;
        let failCount = 0;

        for (const charId of characters) {
            try {
                const imageUrl = `https://enka.network/ui/UI_AvatarIcon_${charId}.png`;
                const fileName = `${charId}.png`;
                const filePath = path.join(imageDirGI, fileName);

                // ファイルが既に存在する場合はスキップ
                if (fs.existsSync(filePath)) {
                    console.log(`⊘ スキップ: ${fileName} (既存)`);
                    continue;
                }

                await downloadFile(imageUrl, filePath);
                successCount++;
                console.log(`✓ ダウンロード完了: ${fileName}`);
            } catch (error) {
                failCount++;
                console.log(`✗ ダウンロード失敗: ${charId} - ${error.message}`);
            }
        }

        console.log(`\n📊 GI ダウンロード結果: 成功 ${successCount}, 失敗 ${failCount}`);
    } catch (error) {
        console.error('Error:', error);
    }
}

// メイン処理
async function main() {
    console.log('🚀 キャラクター画像ダウンロード開始\n');
    await downloadGICharacters();
    console.log('\n✨ 完了！');
}

main().catch(console.error);
