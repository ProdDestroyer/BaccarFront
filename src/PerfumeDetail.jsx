import { useLocation } from "react-router-dom";
import styles from "./PerfumeDetail.module.css";
import { VolumeCarousel } from "./VolumeCarousel";
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


    const whatsappConnect = () => {

        const message =
            `Hola, estoy interesado(a) en el siguiente producto:\n${perfumeData.name}`;

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

                    <VolumeCarousel
                        volumesString={perfumeData.row[9]}
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
    );
};