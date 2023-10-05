import styles from './winnerPopup.module.css'
import React from "react";

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
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <div className={styles.titleWrapper}>
                        Game result:
                    </div>
                    {onClose && (<div className={styles.closeButtonWrapper}>
                        <button className={styles.closeButton} onClick={() => {
                            onClose();
                        }}>X</button>
                    </div>)}
                </div>
                <div className={styles.modalBody}>
                    <p className={styles.winnerText}>{renderWinnerText()}</p>
                    {onNewGame && (<div className={styles.newGameButtonWrapper}>
                        <button className={styles.newGameButton} onClick={() => {
                            onNewGame();
                        }}>New Game</button>
                    </div>)}
                </div>
            </div>
        </div>
    )
}
