import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import React from "react";

export const siteTitle = 'Tic-tac-toe game';

interface LayoutProps {
    children: React.ReactNode
    home?: boolean
}

export default function Layout({children, home}: LayoutProps) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico"/>
                <meta
                    name="description"
                    content="Test for frontend applicants"
                />
                <meta name="og:title" content={siteTitle}/>
            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                        <h1 className={utilStyles.heading2Xl}>Tic-tac-toe game</h1>
                    </>
                ) : (
                    <>
                        <h2 className={utilStyles.headingLg}>
                            Tic-tac-toe game
                        </h2>
                    </>
                )}
            </header>
            <main>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">← Back to home</Link>
                </div>
            )}
        </div>
    )
}
