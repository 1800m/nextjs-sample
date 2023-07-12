import Head from 'next/head';
import Link from 'next/link';

import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';
import utilStyle from '../styles/utils.module.css';
import { getAllPostIds, getPostData } from '../lib/posts';

// SSGの場合のプリレンダリング
export async function getStaticProps() {
  const file_names = getAllPostIds();
  // console.log(file_names);
  const all_posts_data = [];
  for (const file_name of file_names) {
    const post_data = await getPostData(file_name.params.id);
    console.log(post_data);
    all_posts_data.push(post_data);
  }

  return {
    // NOTE: NEXTJSのgetStaticProps特有の記法
    props: {
      all_posts_data,
    }
  }
}

export default function Home({all_posts_data}) {
  return (
    <Layout>
      {/* ここがchildrenに相当 */}
      <section className={`${utilStyle.headingMd}`}>
        <p>
          サンプルブログアプリケーション
        </p>
      </section>

      <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {all_posts_data.map(({id, title, date, thumbnail}) => {
            return (
              <article key={id}>
                <Link href={`/posts/${id}`}>
                  <img
                    src={`${thumbnail}`}
                    className={styles.thumbnailImage}
                    alt={`${thumbnail}`} />
                </Link>
                {/* <Link href={`/posts/${id}`}> */}
                <a className={utilStyle.boldText}>
                  {title}
                </a>
                {/* </Link> */}
                <br />
                <small className={utilStyle.lightText}>
                  {date}
                </small>
              </article>
            );
          })}
        </div>
      </section>
    </Layout>
  )
}
