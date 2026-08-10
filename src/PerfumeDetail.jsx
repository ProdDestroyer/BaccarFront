import { useLocation } from "react-router-dom";
import { useState } from "react";
import styles from "./PerfumeDetail.module.css";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

export const PerfumeDetail = () => {

    const location = useLocation();

    const perfumeData = {
        ...location.state?.result,
        description: "any dumb description here that I dont even know what to speak about",
        price: "25.000",
        logo: "YOUR_LOGO_URL_HERE"
    };

    console.log("perfumeData ", perfumeData);


    /*
     * Example:
     * perfumeData.row[9] = "30ml,50ml,100ml"
     *
     * Result:
     * ["30ml", "50ml", "100ml"]
     */
    const volumes = perfumeData.row?.[9]
        ? perfumeData.row[9]
            .split(",")
            .map(volume => volume.trim())
            .filter(Boolean)
        : [];


    const [selectedVolume, setSelectedVolume] = useState(
        volumes[0] || null
    );


    console.log("selectedVolume:", selectedVolume);


    const whatsappConnect = () => {

        const message =
            `Hola, estoy interesado(a) en el siguiente producto:\n` +
            `${perfumeData.name}\n` +
            `Presentación: ${selectedVolume}`;

        const url =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank");
    };


    return (
        <div className={styles.page}>

            <div className={styles.product}>

                {/* LEFT SIDE */}

                <div className={styles.leftSide}>

                    <div className={styles.imageWrapper}>

                        <img
                            src={perfumeData.image}
                            alt={perfumeData.name}
                            className={styles.image}
                        />

                    </div>

                    <h1 className={styles.name}>
                        {perfumeData.name}
                    </h1>

                </div>


                {/* RIGHT SIDE */}

                <div className={styles.rightSide}>

                    {/* BRAND LOGO */}

                    <div className={styles.logoWrapper}>

                        <img
                            src={perfumeData.row[5]}
                            alt=""
                            className={styles.logo}
                        />

                    </div>


                    {/* DESCRIPTION */}

                    <div className={styles.descriptionWrapper}>

                        <p className={styles.description}>
                            {perfumeData.description}
                        </p>

                        <div className={styles.price}>
                            {perfumeData.price}
                        </div>

                    </div>


                    {/* VOLUME PANEL */}

                    {volumes.length > 0 && (

                        <div className={styles.volumePanel}>

                            <div className={styles.volumeTitle}>
                                Presentación
                            </div>

                            <div className={styles.volumeList}>

                                {volumes.map(volume => (

                                    <button
                                        key={volume}
                                        type="button"
                                        className={`${styles.volumeTile} ${
                                            selectedVolume === volume
                                                ? styles.volumeSelected
                                                : ""
                                        }`}
                                        onClick={() =>
                                            setSelectedVolume(volume)
                                        }
                                    >

                                        <div className={styles.volumeImageWrapper}>

                                            <img
                                                src={`/${volume}.png`}
                                                alt={volume}
                                                className={styles.volumeImage}
                                            />

                                        </div>

                                        <span className={styles.volumeName}>
                                            {volume}
                                        </span>

                                    </button>

                                ))}

                            </div>

                        </div>

                    )}


                    {/* BUY BUTTON */}

                    <button
                        className={styles.buyButton}
                        onClick={whatsappConnect}
                    >
                        Comprar
                    </button>

                </div>

            </div>

        </div>
    );
};
