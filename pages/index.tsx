import Head from 'next/head'
import Layout, {siteTitle} from '../components/layout'
import utilStyles from '../styles/game.module.css'
import {getSortedPostsData} from '../lib/posts'
import {GetStaticProps} from 'next'

export default function Home() {
    const size: number = 3;
    const table: number[][] = [[0, 0, 0,], [0, 0, 0,], [0, 0, 0,]];

    function reset() {
        console.log("index.tsx reset");
    };

    function save() {
        console.log("index.tsx save");
    };

    function sizeChange(size: number) {
        console.log("index.tsx sizeChange", size);
    };

    function cellClick(colIndex: number, rowIndex: number) {
        console.log("index.tsx cellClick", colIndex, rowIndex);
    };

    return (
        <Layout home>
            <Head>
                <title>Tic-tac-toe game</title>
            </Head>
            <div className={utilStyles.tableWrapper}>
                <div className={utilStyles.controllers}>
                    <button className={utilStyles.controllersButton} onClick={() => {
                        reset()
                    }}>Reset
                    </button>
                    <button className={utilStyles.controllersButton} onClick={() => {
                        save()
                    }}>Save
                    </button>
                    {size !== 3 && (<button className={utilStyles.controllersButton} onClick={() => {
                        sizeChange(3)
                    }}>3x3</button>)}
                    {size !== 4 && (<button className={utilStyles.controllersButton} onClick={() => {
                        sizeChange(4)
                    }}>4x4</button>)}
                    {size !== 5 && (<button className={utilStyles.controllersButton} onClick={() => {
                        sizeChange(5)
                    }}>5x5</button>)}
                    {size !== 6 && (<button className={utilStyles.controllersButton} onClick={() => {
                        sizeChange(6)
                    }}>6x6</button>)}
                    {size !== 7 && (<button className={utilStyles.controllersButton} onClick={() => {
                        sizeChange(7)
                    }}>7x7</button>)}
                </div>
                <div className={utilStyles.stretchyWrapper}>
                    <div className={utilStyles.container}>
                        <div className={utilStyles.table}>
                            {table.map((row, colIndex) => (
                                <div className={utilStyles.row} key={`row-${colIndex}`}>
                                    {row.map((cell, rowIndex) => (
                                        <div className={utilStyles.cell} key={`col-${rowIndex}`}>
                                            <button className={utilStyles.tableButton} onClick={() => {
                                                cellClick(colIndex, rowIndex)
                                            }}>
                                                {cell}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
