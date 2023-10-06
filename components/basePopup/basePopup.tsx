import styles from './basePopup.module.css'
import {ReactNode} from "react";

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
                        <button className={styles.closeButton} onClick={() => {
                            onClose();
                        }}>X
                        </button>
                    </div>)}
                </div>
                <div className={styles.modalBody}>
                    {children}
                </div>
            </div>
        </div>
    )
}
