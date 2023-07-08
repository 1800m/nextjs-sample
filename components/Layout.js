import Head from "next/head";
import styles from "./layout.module.css";
import utilsstyles from "../styles/utils.module.css";

const TITLE_NAME = "Sample Blog App";
export const SITE_TITLE = "Next.js Blog";

function Layout({children}) {
    return (
        <div className={styles.container}>
            <Head>
                <title>{SITE_TITLE}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className={styles.header}> 
                <img src="/vercel.svg" className={utilsstyles.borderCircle} />
                <h1 className={utilsstyles.heading2X1}>{TITLE_NAME}</h1>
            </header>
            <main>{children}</main>
        </div>
    );
}

export default Layout;