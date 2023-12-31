import Head from 'next/head'
import Layout from '../components/layout/layout'
import {useEffect, useState} from "react";
import {deleteGame, getGames} from "../api/gameApi";
import styles from '../styles/gameList.module.css'
import Button from "../components/button/button";
import {useRouter} from "next/router";
import { toast } from "react-toastify";

type Game = {
    id: number
    name: string
    board: string
}

export default function Home() {
    const router = useRouter()

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

    function onLoad(id: number) {
        router.push(`/${id}`);
    }

    function onDelete(id: number) {
        deleteGame(id)
            .then(() => {
                removeGameFromList(id)
            })
            .catch(error => {
                console.log(error)
                toast("Delete error", { hideProgressBar: true, autoClose: 2000, type: 'error', position:'bottom-right' });
            });
    }

    return (
        <Layout>
            <Head>
                <title>Tic-tac-toe game</title>
            </Head>
            {games.length > 0 ? (
                <div className={styles.gameList}>
                    {games.map(game => (
                        <div key={game.id} className={styles.gameWrapper}>
                            <div className={styles.gameId}>{game.id}</div>
                            <div className={styles.gameName}>{game.name}</div>
                            <div className={styles.gameControllers}>
                                <Button onClick={() => {
                                    onLoad(game.id);
                                }} title="Load"/>
                                <Button onClick={() => {
                                    onDelete(game.id);
                                }} title="Delete"/>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.emptyGameList}>
                    There are no saved games
                </div>
            )}
        </Layout>
    )
}
