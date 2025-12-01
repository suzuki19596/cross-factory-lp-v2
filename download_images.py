"""
Unsplashからフリー素材画像をダウンロードするスクリプト
物流・軽作業・倉庫関連の画像
"""
import urllib.request
import os
import ssl

# SSL証明書の検証を無効化（一部環境で必要）
ssl._create_default_https_context = ssl._create_unverified_context

# 画像保存先
output_dir = os.path.join(os.path.dirname(__file__), 'images')
os.makedirs(output_dir, exist_ok=True)

# Unsplashの画像URL（フリー素材）- 物流・倉庫・軽作業テーマ
images = {
    # ヒーロー画像 - 倉庫・物流
    'hero1.jpg': 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=1920&q=80',  # 倉庫・物流
    'hero2.jpg': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80',  # 倉庫作業
    'hero3.jpg': 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&q=80',  # 配送・物流

    # ポリシーセクション - 物流作業イメージ
    'policy.jpg': 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=800&q=80',  # 梱包・物流

    # サービス画像（旧製品画像）
    'product1.jpg': 'https://images.unsplash.com/photo-1607166452427-7e4477079cb9?w=600&q=80',  # 梱包作業
    'product2.jpg': 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80',  # 検品作業
    'product3.jpg': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',  # ピッキング
    'product4.jpg': 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=600&q=80',  # 仕分け作業
    'product5.jpg': 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80',  # その他軽作業

    # 企業情報 - オフィスビル
    'company.jpg': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',  # オフィスビル

    # 採用 - チームワーク・倉庫スタッフ
    'recruit.jpg': 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80',  # チームワーク
}

def download_image(url, filename):
    """画像をダウンロード"""
    filepath = os.path.join(output_dir, filename)
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        request = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(request, timeout=30) as response:
            with open(filepath, 'wb') as f:
                f.write(response.read())
        print(f"Downloaded: {filename}")
        return True
    except Exception as e:
        print(f"Failed to download {filename}: {e}")
        return False

# 画像をダウンロード
print("Downloading images from Unsplash...")
success_count = 0
for filename, url in images.items():
    if download_image(url, filename):
        success_count += 1

print(f"\nCompleted: {success_count}/{len(images)} images downloaded")
print(f"Images saved to: {output_dir}")
