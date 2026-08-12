import styles from "./PurchaseModal.module.css";

export const PurchaseModal = ({ onBuy, onCancel }) => {

    return (
        <div className={styles.overlay}>

            <div className={styles.modal}>

                {/* HEADER */}
                <div className={styles.header}>

                    <img
                        src="/goldenLogo.png"
                        alt="Logo"
                        className={styles.logo}
                    />

                </div>


                {/* BODY */}
                <div className={styles.body}>

                    {/* Your content goes here */}

                </div>


                {/* FOOTER */}
                <div className={styles.footer}>

                    <button
                        className={`${styles.button} ${styles.buyButton}`}
                        onClick={onBuy}
                    >
                        Comprar
                    </button>

                    <button
                        className={`${styles.button} ${styles.cancelButton}`}
                        onClick={onCancel}
                    >
                        Cancelar
                    </button>

                </div>

            </div>

        </div>
    );
};
