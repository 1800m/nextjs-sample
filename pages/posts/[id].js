// NOTE: /pages/posts/[id].jsページを作成。

import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

import Head from "next/head";
import Date from "../../components/date";

import utilStyles from "../../styles/utils.module.css";

// 動的ルーティング設定のための関数。
// NOTE: pathsがルーティング設定になっている(開発環境なら毎回リクエスト時に実行、本番環境ならビルド時だけ実行)。
// idがとりうる値のリストを返す
export async function getStaticPaths() {
  const paths = getAllPostIds();

  return {
    paths,           // どのパスが事前にレンダリングされるのか決める。
    fallback: false, // false: 上のpathsに含まれてないパスはアクセスすると404ページになる。
  };
}

// SSG(id(ファイル名)に基づいて必要なデータを取得)
export async function getStaticProps({ params }) {
  const post_data = await getPostData(params.id);

  console.log(post_data);
  return {
    props: {
      post_data,
    },
  };
}

export default function Post({ post_data }) {
  return (
    <Layout>
      <Head>
        <title>{post_data.title}</title>
      </Head>

      <article>
        <h1 className={utilStyles.headingXl}>{post_data.title}</h1>
        <div className={utilStyles.lightText}>
          <Date date_string={post_data.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post_data.content_html }} />
      </article>
    </Layout>
  );
}
