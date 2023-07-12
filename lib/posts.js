import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

import { remark } from 'remark';
import html from 'remark-html';

// /workspace/nextjs-sample + /posts
const posts_directory = path.join(process.cwd(), "posts");
// console.log(posts_directory);

// mdファイルのデータを日付順に取り出す
export function getSortedPostsData() {
  // /posts配下のファイル名を取得
  const file_names = fs.readdirSync(posts_directory);
  // console.log(file_names);
  const all_posts_data = file_names.map((file_name) => {
    const id = file_name.replace(/\.md$/, "");
    const full_path = path.join(posts_directory, file_name);
    const file_contents = fs.readFileSync(full_path, "utf8");
    const matter_result = matter(file_contents);  // NOTE: 投稿のメタデータ部分の解析

    return {
      id,
      ...matter_result.data,
    };
  });
  // console.log(all_posts_data);

  // 投稿を日付でソートする
  return all_posts_data.sort((a, b) => {
    if (a.data < b.data) {
      return 1;
    } else {
      return -1;
    }
  });
}

// 動的ルーティング時に設定
// postsディレクトリの中の全てのファイル名をリストで返す
export function getAllPostIds() {
  const file_names = fs.readdirSync(posts_directory);
  return file_names.map((file_name) => {
    return {
      params: {
        id: file_name.replace(/\.md$/, ""),
      },
    };
  });
}

// idに基づいてブログの投稿データを返す
export async function getPostData(id) {
  const full_path = path.join(posts_directory, `${id}.md`);
  const file_contents = fs.readFileSync(full_path, "utf8");
  const matter_result = matter(file_contents);  // NOTE: 投稿のメタデータ部分の解析
  // console.log(matter_result);

  // NOTE: マークダウンをHTML文字列に変換するためにremarkを使う
  const processed_content = await remark()
    .use(html)
    .process(matter_result.content);

  const content_html = processed_content.toString();
  // console.log(content_html);

  //データをidと組み合わせる。
  return {
    id,
    content_html, //あとで追加
    ...matter_result.data,
  };
}
