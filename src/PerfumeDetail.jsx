import { useLocation } from "react-router-dom";
import styles from "./PerfumeDetail.module.css";
import { VolumeCarousel } from "./VolumeCarousel";
import { SimpleTopBar } from "./SimpleTopBar";
import { useState } from "react";
import { Footer } from "./Footer";
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

export const PerfumeDetail = () => {


    const location = useLocation();
    const perfumeData = {
        ...location.state?.result,
        logo: "YOUR_LOGO_URL_HERE"
    };

    const description = perfumeData.row[perfumeData.row.length - 5];
    const [price, setPrice] = useState(perfumeData.row[perfumeData.row.length - 3].split(',')[0])
    console.log("perfumeData ", perfumeData);

    const updateRelatedToVolumeChange = (index) => {
        setPrice(perfumeData.row[perfumeData.row.length - 3].split(',')[index]);
    }
    const whatsappConnect = () => {

        const message =
            `Hola, estoy interesado(a) en el siguiente producto:\n${perfumeData.name}`;

        const url =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank");
    };


    return (
        <>
            <SimpleTopBar title={perfumeData.name} />
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
                                {description}
                            </p>

                            <div className={styles.price}>
                                {`$${price}`}
                            </div>

                        </div>

                        {/* VOLUME PANEL */}

                        <VolumeCarousel
                            volumesString={perfumeData.row[perfumeData.row.length - 1]}
                            setSelectedVolumeIndex={updateRelatedToVolumeChange}
                        />

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