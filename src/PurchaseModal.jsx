import { useState } from "react";
import styles from "./PurchaseModal.module.css";
import { VolumeCarousel } from "./VolumeCarousel";

export const PurchaseModal = ({ onBuy, onCancel, volumesString, imageURL }) => {

    const availableVolumes = volumesString?.split(',');
    const [selectedVolume, setSelectedVolume] = useState(0);

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

                    <VolumeCarousel
                        volumesString={volumesString}
                        modalMode={true}
                        setSelectedVolumeIndex={setSelectedVolume}
                        imageURL={imageURL}
                    />
                    <p>Recuerda que nuestros productos son inspirados en el producto original</p>
                </div>


                {/* FOOTER */}
                <div className={styles.footer}>

                    <button
                        className={`${styles.button} ${styles.buyButton}`}
                        onClick={() => onBuy(availableVolumes[selectedVolume])}
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
