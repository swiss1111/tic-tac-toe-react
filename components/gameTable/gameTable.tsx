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
import {getGame, modifyGame, opponentMove, saveGame} from "../../api/gameApi";
import Layout from "../layout/layout";
import Head from "next/head";
import WinnerPopup from "../winnerPopup/winnerPopup";
import SavePopup from "../savePopup/savePopup";
import {toast} from "react-toastify";

interface GameTableProps {
    id?: number
}

interface OpponentMoveResponse {
    board: string
    index: number
    isDraw: boolean
    player: number
    winning: number
}

export default function GameTable({id}: GameTableProps) {
    const router = useRouter()

    const [size, setSize] = useState(3);
    const [table, setTable] = useState(createEmptyTable(size));
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [winner, setWinner] = useState(0);
    const [gameWithAi, setAi] = useState(false);
    const [isOpenSaveModal, openSaveModal] = useState(false);

    useEffect(() => {
        loadGame();
    }, [id])

    useEffect(() => {
        if (gameWithAi && currentPlayer === 2 && !winner) {
            aiStep();
        }
        loadGame();
    }, [currentPlayer])

    function changePlayer() {
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }

    function reset() {
        if (id) {
            router.push("/");
        } else {
            setTable(createEmptyTable(size));
            setCurrentPlayer(1);
            setWinner(0);
        }
    }

    function save(name: string) {
        if (id) {
            modifyGame(id, boardStringify(table, size), name)
                .then(() => {
                    openSaveModal(false);
                    toast("Modify successful", {
                        hideProgressBar: true,
                        autoClose: 2000,
                        type: 'success',
                        position: 'bottom-right'
                    });
                })
                .catch(error => {
                    console.log(error)
                    toast("Modify error", {
                        hideProgressBar: true,
                        autoClose: 2000,
                        type: 'error',
                        position: 'bottom-right'
                    });
                });
        } else {
            saveGame(boardStringify(table, size), name)
                .then(() => {
                    openSaveModal(false);
                    toast("Save successful", {
                        hideProgressBar: true,
                        autoClose: 2000,
                        type: 'success',
                        position: 'bottom-right'
                    });
                })
                .catch(error => {
                    console.log(error)
                    toast("Save error", {
                        hideProgressBar: true,
                        autoClose: 2000,
                        type: 'error',
                        position: 'bottom-right'
                    });
                });
        }
    }

    function loadGame() {
        if (id) {
            getGame(id)
                .then(resp => {
                    const parsedGameData = parseTableData(resp.board);
                    setSize(parsedGameData.size);
                    setTable(parsedGameData.table);
                    setCurrentPlayer(parsedGameData.currentPlayer)
                })
                .catch(error => {
                    console.log(error)
                    toast("Game loading error", {
                        hideProgressBar: true,
                        autoClose: 2000,
                        type: 'error',
                        position: 'bottom-right'
                    });
                });
        }
    }

    function onModifyModal() {
        openSaveModal(true);
    }

    function onOpenSaveModal() {
        openSaveModal(true);
    }

    function toggleAiGame() {
        setAi(!gameWithAi);
        reset();
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

    function aiStep() {
        opponentMove(2, boardStringify(table, size))
            .then(resp => {
                const parsedGameData = parseTableData((resp as OpponentMoveResponse).board);
                setTable(parsedGameData.table);
                setCurrentPlayer(parsedGameData.currentPlayer)
                setWinner(getWinner(parsedGameData.table, size));
            })
            .catch(error => {
                console.log(error)
                toast("AI step error", {
                    hideProgressBar: true,
                    autoClose: 2000,
                    type: 'error',
                    position: 'bottom-right'
                });
            });
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
                    <Button onClick={onNavigateToGameList} title="Game list"/>
                    <Button onClick={reset} title="Reset"/>
                    {!!id ? (<Button onClick={onModifyModal} title="Modify"/>) : (
                        <>
                            <Button onClick={onOpenSaveModal} title="Save"/>
                            {createTableSizesArray().filter(newSize => newSize !== size).map(newSize => (
                                <Button key={newSize} onClick={() => {
                                    sizeChange(newSize)
                                }} title={`${newSize}x${newSize}`}/>
                            ))}
                            <Button onClick={toggleAiGame} title={gameWithAi ? "New PvP Game " : "New PvE Game"}/>
                        </>
                    )}
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
                                            }} disabled={gameWithAi && currentPlayer === 2}>
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
