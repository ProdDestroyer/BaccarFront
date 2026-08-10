import { useState } from "react";
import styles from "./VolumeCarousel.module.css";

export const VolumeCarousel = ({ volumesString }) => {

    const volumes = volumesString
        ? volumesString
            .split(",")
            .map(volume => volume.trim())
            .filter(Boolean)
        : [];

    const [selectedVolume, setSelectedVolume] = useState(
        volumes[0] || null
    );


    if (volumes.length === 0) {
        return null;
    }


    return (
        <div className={styles.volumePanel}>

            <div className={styles.volumeTitle}>
                Presentación
            </div>

            <div className={styles.volumeList}>

                {volumes.map(volume => {

                    const selected = selectedVolume === volume;

                    return (
                        <button
                            key={volume}
                            type="button"
                            className={`${styles.volumeTile} ${
                                selected
                                    ? styles.selected
                                    : ""
                            }`}
                            onClick={() => setSelectedVolume(volume)}
                        >

                            <div className={styles.imageWrapper}>

                                <img
                                    src={`/${volume}.png`}
                                    alt={volume}
                                    className={styles.image}
                                />

                            </div>

                            <span className={styles.volumeName}>
                                {volume}
                            </span>

                        </button>
                    );

                })}

            </div>

        </div>
    );
};
