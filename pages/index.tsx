import Head from 'next/head'
import Layout from '../components/layout/layout'
import utilStyles from '../styles/game.module.css'
import {useState} from 'react';
import {boardStringify, createEmptyTable, createTableSizesArray, getWinner} from "../utils/gameUtils";
import WinnerPopup from "../components/winnerPopup/winnerPopup";
import {saveGame} from "../api/gameApi";
import SavePopup from "../components/savePopup/savePopup";

export default function Home() {
    const [size, setSize] = useState(3);
    const [table, setTable] = useState(createEmptyTable(size));
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [winner, setWinner] = useState(0);
    const [isOpenSaveModal, openSaveModal] = useState(false);

    function changePlayer() {
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }

    function reset() {
        setTable(createEmptyTable(size));
        setCurrentPlayer(1);
        setWinner(0);
    }

    function save(name: string) {
        saveGame(boardStringify(table, size), name)
            .then(resp => {
                openSaveModal(false);
                console.log(resp)
            })
            .catch(error => console.log(error));
    }

    function onOpenSaveModal() {
        openSaveModal(true);
    }

    function closeSaveModal() {
        openSaveModal(false);
    }

    function sizeChange(size: number) {
        setSize(size);
        setTable(createEmptyTable(size));
        setCurrentPlayer(1);
        setWinner(0);
    }

    function cellClick(colIndex: number, rowIndex: number) {
        if (table[colIndex][rowIndex] !== 0 || winner) {
            return
        }

        const tempTable = [...table];
        tempTable[colIndex][rowIndex] = currentPlayer;
        setTable(tempTable);

        setWinner(getWinner(tempTable, size));

        if (!winner) {
            changePlayer();
            return
        }
    }

    function renderText(value: number): string {
        if (value === 1) {
            return 'X'
        } else if (value === 2) {
            return 'O'
        }
        return ''
    }

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
                        onOpenSaveModal()
                    }}>Save
                    </button>
                    {createTableSizesArray().filter(newSize => newSize !== size).map(newSize => (
                        <button key={newSize} className={utilStyles.controllersButton} onClick={() => {
                            sizeChange(newSize)
                        }}>{`${newSize}x${newSize}`}</button>))}
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
                                                {renderText(cell)}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <WinnerPopup winner={winner} onClose={reset} onNewGame={reset}/>
                <SavePopup isOpenSaveModal={isOpenSaveModal} onSave={save} onClose={closeSaveModal} onCancel={closeSaveModal} />
            </div>
        </Layout>
    )
}
