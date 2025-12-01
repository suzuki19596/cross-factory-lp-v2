"""
プレースホルダー画像を生成するスクリプト
"""
from PIL import Image, ImageDraw, ImageFont
import os

# 画像保存先
output_dir = os.path.join(os.path.dirname(__file__), 'images')
os.makedirs(output_dir, exist_ok=True)

def create_placeholder(filename, width, height, bg_color, text, text_color=(255, 255, 255)):
    """プレースホルダー画像を生成"""
    img = Image.new('RGB', (width, height), bg_color)
    draw = ImageDraw.Draw(img)

    # グラデーション効果（簡易版）
    for i in range(height):
        ratio = i / height
        r = int(bg_color[0] * (1 - ratio * 0.3))
        g = int(bg_color[1] * (1 - ratio * 0.3))
        b = int(bg_color[2] * (1 - ratio * 0.3))
        draw.line([(0, i), (width, i)], fill=(r, g, b))

    # テキストを中央に配置
    try:
        font = ImageFont.truetype("C:/Windows/Fonts/meiryo.ttc", 24)
    except:
        font = ImageFont.load_default()

    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    x = (width - text_width) // 2
    y = (height - text_height) // 2

    draw.text((x, y), text, fill=text_color, font=font)

    filepath = os.path.join(output_dir, filename)
    img.save(filepath, quality=90)
    print(f"Created: {filename}")

# 画像定義 - 物流・軽作業テーマ
images = [
    # ヒーロー画像
    ('hero1.jpg', 1920, 1080, (30, 60, 100), 'Hero Image 1 - Warehouse'),
    ('hero2.jpg', 1920, 1080, (40, 70, 110), 'Hero Image 2 - Logistics'),
    ('hero3.jpg', 1920, 1080, (35, 80, 90), 'Hero Image 3 - Delivery'),

    # ポリシーセクション
    ('policy.jpg', 800, 600, (50, 80, 120), 'Logistics Image'),

    # サービス画像
    ('product1.jpg', 600, 600, (60, 90, 130), '梱包作業'),
    ('product2.jpg', 600, 600, (55, 85, 125), '検品作業'),
    ('product3.jpg', 600, 600, (65, 95, 135), 'ピッキング'),
    ('product4.jpg', 600, 600, (50, 80, 120), '仕分け作業'),
    ('product5.jpg', 600, 600, (70, 100, 140), 'その他軽作業'),

    # 企業情報
    ('company.jpg', 800, 600, (45, 75, 115), 'Head Office'),

    # 採用
    ('recruit.jpg', 800, 600, (55, 85, 125), 'Team Work'),
]

# 画像生成
for filename, width, height, bg_color, text in images:
    create_placeholder(filename, width, height, bg_color, text)

print(f"\nAll images created in: {output_dir}")
