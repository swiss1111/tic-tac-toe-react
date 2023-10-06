import styles from './basePopup.module.css'
import {ReactNode} from "react";
import Button from "../button/button";

interface BasePopupProps {
    isModalOpen: boolean
    title: string
    onClose?: () => void
    children: ReactNode
}

export default function BasePopup({isModalOpen, onClose, title, children}: BasePopupProps) {

    if (!isModalOpen) {
        return null;
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <div className={styles.titleWrapper}>
                        {title}
                    </div>
                    {onClose && (<div className={styles.closeButtonWrapper}>
                        <Button onClick={onClose} title="X" />
                    </div>)}
                </div>
                <div className={styles.modalBody}>
                    {children}
                </div>
            </div>
        </div>
    )
}
