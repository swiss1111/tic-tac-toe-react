import styles from './gameTable.module.css'
import {useEffect, useState} from "react";
import Button from "../button/button";
import {useRouter} from "next/router";
import {
    boardStringify,
    createEmptyTable,
    createTableSizesArray,
    getWinner,
    parseTableData
} from "../../utils/gameUtils";
import {getGame, saveGame} from "../../api/gameApi";
import Layout from "../layout/layout";
import Head from "next/head";
import WinnerPopup from "../winnerPopup/winnerPopup";
import SavePopup from "../savePopup/savePopup";

interface GameTableProps {
    id?: number
}

export default function GameTable({id}: GameTableProps) {
    const router = useRouter()

    const [size, setSize] = useState(3);
    const [table, setTable] = useState(createEmptyTable(size));
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [winner, setWinner] = useState(0);
    const [isOpenSaveModal, openSaveModal] = useState(false);

    useEffect(() => {
        loadGame();
    }, [id])

    function changePlayer() {
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }

    function reset() {
        if( id ) {
            router.push("/");
        }
        else {
            setTable(createEmptyTable(size));
            setCurrentPlayer(1);
            setWinner(0);
        }
    }

    function save(name: string) {
        saveGame(boardStringify(table, size), name)
            .then(() => {
                openSaveModal(false);
                // TODO: Success message
            })
            .catch(error => {
                console.log(error)
                // TODO: Error message
            });
    }

    function loadGame() {
        if (id) {
            getGame(id)
                .then(resp => {
                    const parsedGameData = parseTableData(resp.board);
                    setSize(parsedGameData.size);
                    setTable(parsedGameData.table);
                })
                .catch(error => {
                    console.log(error)
                    // TODO: Error message
                });
        }
    }

    function onOpenSaveModal() {
        openSaveModal(true);
    }

    function onNavigateToGameList() {
        router.push('/gameList');
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
            <div className={styles.tableWrapper}>
                <div className={styles.controllers}>
                    <Button onClick={reset} title="Reset"/>
                    <Button onClick={onOpenSaveModal} title="Save"/>
                    <Button onClick={onNavigateToGameList} title="Game list"/>
                    {createTableSizesArray().filter(newSize => newSize !== size).map(newSize => (
                        <Button key={newSize} onClick={() => {
                            sizeChange(newSize)
                        }} title={`${newSize}x${newSize}`}/>
                    ))}
                </div>
                <div className={styles.stretchyWrapper}>
                    <div className={styles.container}>
                        <div className={styles.table}>
                            {table.map((row, colIndex) => (
                                <div className={styles.row} key={`row-${colIndex}`}>
                                    {row.map((cell, rowIndex) => (
                                        <div className={styles.cell} key={`col-${rowIndex}`}>
                                            <button className={styles.tableButton} onClick={() => {
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
                <SavePopup isOpenSaveModal={isOpenSaveModal} onSave={save} onClose={closeSaveModal}
                           onCancel={closeSaveModal}/>
            </div>
        </Layout>
    )
}
