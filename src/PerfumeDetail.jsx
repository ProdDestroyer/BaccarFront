import { useLocation } from "react-router-dom";
import styles from "./PerfumeDetail.module.css";
import { VolumeCarousel } from "./VolumeCarousel";
import { SimpleNavbar } from "./SimpleNavbar";
import { useState } from "react";
import { Footer } from "./Footer";
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

export const PerfumeDetail = () => {


    const location = useLocation();
    const perfumeData = {
        ...location.state?.result,
    };

    const hasPresentations = location.state?.corporal;
    console.log('hasPresentations ', hasPresentations);

    const description = perfumeData.row[perfumeData.row.length - 5];
    const availableVolumes = perfumeData.row[perfumeData.row.length-1]?.split(',');
    const [price, setPrice] = useState(perfumeData.row[perfumeData.row.length - 3].split(',')[0])
    const [selectedVolumeIndex, setSelectedVolumeIndex] = useState(perfumeData.row[perfumeData.row.length - 3].split(',')[0])
    console.log("perfumeData ", perfumeData);

    const updateRelatedToVolumeChange = (index) => {
        setPrice(perfumeData.row[perfumeData.row.length - 3].split(',')[index]);
        setSelectedVolumeIndex(index);
    }
    const whatsappConnect = () => {

        const message =
            `Hola, estoy interesado(a) en el siguiente producto:\n${perfumeData.row[perfumeData.row.length -4]}\n${availableVolumes[selectedVolumeIndex]}`;

        const url =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank");
    };


    return (
        <>
            <SimpleNavbar title={perfumeData.name} />
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
                            { hasPresentations ?
                                (<><strong>{perfumeData.row[3]}</strong>{" "}
                                    inspirado en{" "}
                                    <strong>{perfumeData.row[1]}</strong>{" "}
                                    de{" "}
                                    <strong>{perfumeData.row[2]}</strong></>) : (
                            <>
                                {perfumeData.prefix} aroma{" "}
                                <strong>{perfumeData.row[1]}</strong>
                            </>)}
                        </h1>

                    </div>


                    {/* RIGHT SIDE */}

                    <div className={styles.rightSide}>

                        {/* BRAND LOGO */}

                        <div className={styles.logoWrapper}>

                            <img
                                src={`${!hasPresentations ? '/blackLogo.png' : !perfumeData.row[5] ? 'blackLogo.png' : perfumeData.row[5]}`}
                                alt=""
                                className={styles.logo}
                            />

                        </div>


                        {/* DESCRIPTION */}

                        <div className={styles.descriptionWrapper}>

                            <p className={styles.description}>
                                {description}
                            </p>

                            <div className={styles.price}>
                                
                                <span>{`$${price}`}</span> <span className={styles.conditionText}> Recuerda que nuestros productos son inspirados en la fragancia original</span>
                            </div>

                        </div>

                        {/* VOLUME PANEL */}

                        {hasPresentations && <VolumeCarousel
                            volumesString={perfumeData.row[perfumeData.row.length - 1]}
                            setSelectedVolumeIndex={updateRelatedToVolumeChange}
                        />}

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
            <Footer />
        </>
    );
};