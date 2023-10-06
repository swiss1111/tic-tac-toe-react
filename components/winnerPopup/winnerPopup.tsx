import styles from './winnerPopup.module.css'
import React from "react";
import BasePopup from "../basePopup/basePopup";

interface WinnerPopupProps {
    winner: number
    onClose?: () => void
    onNewGame?: () => void
}

export default function WinnerPopup({winner, onClose, onNewGame}: WinnerPopupProps) {
    if (!winner) {
        return null;
    }

    function renderWinnerText(): undefined | string {
        switch (winner) {
            case 1:
                return "Player X is the winner";
            case 2:
                return "Player O is the winner";
            case 3:
                return "Draw";
        }
    }

    return (
        <BasePopup isModalOpen={!!winner} title="Game result:" onClose={onClose}>
            <p className={styles.winnerText}>{renderWinnerText()}</p>
            {onNewGame && (<div className={styles.newGameButtonWrapper}>
                <button className={styles.newGameButton} onClick={() => {
                    onNewGame();
                }}>New Game
                </button>
            </div>)}
        </BasePopup>
    )
}
