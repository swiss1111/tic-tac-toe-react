import styles from './savePopup.module.css'
import React, {useEffect, useState} from "react";
import BasePopup from "../basePopup/basePopup";

interface SavePopupProps {
    isOpenSaveModal: boolean
    onClose?: () => void
    onCancel?: () => void
    onSave: (name: string) => void
}

export default function SavePopup({isOpenSaveModal, onClose, onCancel, onSave}: SavePopupProps) {
    const [name, setName] = useState("");

    useEffect(() => {
        setName("");
    }, [isOpenSaveModal])

    return (
        <BasePopup isModalOpen={isOpenSaveModal} onClose={onClose} title="Save game">
            <p className={styles.questionText}>Please enter the name you want to save the game under!</p>
            <div className={styles.inputWrapper}>
                <input className={styles.nameInput} value={name} name="firstName" placeholder="Game name"
                       onChange={event => setName(event.target.value)}/>
            </div>
            <div className={styles.buttonsWrapper}>
                {onCancel && (<button className={styles.cancelButton} onClick={() => {
                    onCancel();
                }}>Cancel</button>)}
                <button className={styles.saveButton} onClick={() => {
                    onSave(name);
                }}>Save
                </button>
            </div>
        </BasePopup>
    )
}
