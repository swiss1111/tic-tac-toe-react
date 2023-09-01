import Head from 'next/head'
import Layout from '../components/layout'
import utilStyles from '../styles/game.module.css'
import {useState} from 'react';
import {createEmptyTable} from "../utils/gameUtils";

export default function Home() {
    const [size, setSize] = useState(3);
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [table, setTable] = useState(createEmptyTable(size));

    function changePlayer() {
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    };

    function reset() {
        setTable(createEmptyTable(size));
        setCurrentPlayer(1);
        console.log("index.tsx reset", size, table);
    };

    function save() {
        console.log("index.tsx save");
    };

    function sizeChange(size: number) {
        setSize(size);
        setTable(createEmptyTable(size));
        setCurrentPlayer(1);
        console.log("index.tsx sizeChange", size);
    };

    function cellClick(colIndex: number, rowIndex: number) {
        if (table[colIndex][rowIndex] !== 0) {
            return
        }

        const tempTable = [...table];
        tempTable[colIndex][rowIndex] = currentPlayer;
        setTable(tempTable);

        changePlayer();
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
