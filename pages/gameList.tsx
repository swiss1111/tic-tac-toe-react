import Head from 'next/head'
import Layout from '../components/layout/layout'
import {useEffect, useState} from "react";
import {deleteGame, getGames} from "../api/gameApi";
import styles from '../styles/gameList.module.css'
import Button from "../components/button/button";

type Game = {
    id: number
    name: string
    board: string
}

export default function Home() {
    const [games, setGames] = useState([] as Game[]);

    useEffect(() => {
        getGames()
            .then(resp => {
                setGames(resp as Game[]);
            })
            .catch(error => console.log(error));

    }, [])

    function removeGameFromList(id: number) {
        const gameList = [...games];

        const objWithIdIndex = gameList.findIndex((obj) => obj.id === id);

        if (objWithIdIndex > -1) {
            gameList.splice(objWithIdIndex, 1);
        }

        setGames(gameList);
    }

    function onDelete(id: number) {
        deleteGame(id)
            .then(() => {
                removeGameFromList(id);
                // TODO: Success message
            })
            .catch(error => {
                console.log(error)
                // TODO: Error message
            });
    }

    return (
        <Layout>
            <Head>
                <title>Tic-tac-toe game</title>
            </Head>
            <div className={styles.gameList}>
                {games.map(game => (
                    <div key={game.id} className={styles.gameWrapper}>
                        <div className={styles.gameId}>{game.id}</div>
                        <div className={styles.gameName}>{game.name}</div>
                        <div className={styles.gameControllers}>
                            <Button onClick={() => {}} title="Load" />
                            <Button onClick={() => {
                                onDelete(game.id);
                            }} title="Delete" />
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    )
}
