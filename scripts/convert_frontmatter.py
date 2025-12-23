#!/usr/bin/env python3
import os
import re
from pathlib import Path
from datetime import datetime

# 配置路径
HEXO_POSTS_DIR = "/Users/yangyuhao/mywork/mrsibe.github.io/source/_posts"
HUGO_POSTS_DIR = "/Users/yangyuhao/mywork/mrsibe-blog/content/posts"

def parse_front_matter(content):
    """解析 Front Matter"""
    match = re.match(r'^---\n(.*?)\n---\n(.*)$', content, re.DOTALL)
    if not match:
        return None, content
    return match.group(1), match.group(2)

def convert_date(date_str):
    """转换日期格式为 ISO 8601"""
    try:
        # Hexo 格式: 2025-10-24 15:30:00
        dt = datetime.strptime(date_str.strip(), '%Y-%m-%d %H:%M:%S')
        # Hugo 格式: 2025-10-24T15:30:00+08:00
        return dt.strftime('%Y-%m-%dT%H:%M:%S+08:00')
    except ValueError:
        return date_str

def extract_slug(permalink):
    """从 permalink 提取 slug"""
    if not permalink:
        return None
    # /cs-61b/00-intro/ -> cs-61b/00-intro
    slug = permalink.strip('/').strip()
    return slug if slug else None

def parse_yaml_value(value):
    """解析 YAML 值"""
    value = value.strip()
    # 移除引号
    if (value.startswith("'") and value.endswith("'")) or \
       (value.startswith('"') and value.endswith('"')):
        value = value[1:-1]

    # 解析数组
    if value.startswith('[') and value.endswith(']'):
        # ['a', 'b', 'c'] -> ["a", "b", "c"]
        items = re.findall(r"'([^']*)'", value)
        return items

    return value

def convert_front_matter(fm_text):
    """转换 Front Matter"""
    lines = fm_text.split('\n')
    result = {}

    for line in lines:
        if ':' not in line:
            continue
        key, value = line.split(':', 1)
        key = key.strip()
        value = value.strip()

        if key == 'layout':
            continue  # 跳过 layout
        elif key == 'title':
            result['title'] = f'"{parse_yaml_value(value)}"'
        elif key == 'date':
            result['date'] = convert_date(value)
        elif key == 'categories':
            cats = parse_yaml_value(value)
            if isinstance(cats, list):
                result['categories'] = cats
            else:
                result['categories'] = [cats]
        elif key == 'tags':
            tags = parse_yaml_value(value)
            result['tags'] = tags if isinstance(tags, list) else [tags]
        elif key == 'permalink':
            slug = extract_slug(value)
            if slug:
                result['slug'] = slug

    # 添加默认字段
    result['draft'] = False

    # 生成新的 Front Matter
    new_fm = "---\n"
    new_fm += f"title: {result.get('title', '\"Untitled\"')}\n"
    new_fm += f"date: {result.get('date', datetime.now().isoformat())}\n"

    if 'categories' in result:
        cats = ', '.join([f'"{c}"' for c in result['categories']])
        new_fm += f"categories: [{cats}]\n"

    if 'tags' in result:
        tags = ', '.join([f'"{t}"' for t in result['tags']])
        new_fm += f"tags: [{tags}]\n"

    if 'slug' in result:
        new_fm += f"slug: {result['slug']}\n"

    new_fm += f"draft: false\n"
    new_fm += "---\n"

    return new_fm

def convert_file(source_file, dest_file):
    """转换单个文件"""
    with open(source_file, 'r', encoding='utf-8') as f:
        content = f.read()

    fm_text, body = parse_front_matter(content)

    if fm_text is None:
        print(f"警告: {source_file} 没有 Front Matter，跳过")
        return False

    new_fm = convert_front_matter(fm_text)
    new_content = new_fm + body

    # 确保目标目录存在
    dest_file.parent.mkdir(parents=True, exist_ok=True)

    with open(dest_file, 'w', encoding='utf-8') as f:
        f.write(new_content)

    return True

def main():
    """主函数"""
    hexo_posts = Path(HEXO_POSTS_DIR)
    hugo_posts = Path(HUGO_POSTS_DIR)

    # 遍历所有 markdown 文件
    converted = 0
    failed = 0

    for source_file in hexo_posts.rglob('*.md'):
        # 计算相对路径
        rel_path = source_file.relative_to(hexo_posts)
        dest_file = hugo_posts / rel_path

        print(f"转换: {rel_path}")

        try:
            if convert_file(source_file, dest_file):
                converted += 1
                print(f"  ✓ 成功")
            else:
                failed += 1
                print(f"  ✗ 跳过")
        except Exception as e:
            failed += 1
            print(f"  ✗ 失败: {e}")

    print(f"\n转换完成！")
    print(f"成功: {converted} 个文件")
    print(f"失败/跳过: {failed} 个文件")

if __name__ == '__main__':
    main()
