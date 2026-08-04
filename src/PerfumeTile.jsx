import { useState } from "react";
import styles from "./PerfumeTile.module.css";
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

export const PerfumeTile = ({ perfumeInfo, single }) => {
    const [selectedSize, setSelectedSize] = useState(0);
    const perfumeSizes = perfumeInfo[perfumeInfo.length - 1].split(',');
    const backgroundImages = perfumeInfo[perfumeInfo.length - 2].split(',');
    console.log(backgroundImages);
    const perfumePrices = perfumeInfo[perfumeInfo.length - 3].split(',');
    const whatsappMessage = perfumeInfo[perfumeInfo.length - 4];
    console.log(backgroundImages[selectedSize]);
    const changeSelectedSize = (index) => {
        setSelectedSize(index);
    }
    const whatsappConnect = () => {
        const message = `Hola, estoy interesado(a) en el siguiente producto:\n${whatsappMessage}`;
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank");
    }

    return (
        <div className={`${!single ? styles.tileContainer : styles.tileContainerSingle}`}>
            <div
                className={styles.perfumeImageContainer}
                style={{ backgroundImage: `url(${backgroundImages[selectedSize]})` }}
            >
                <h1 onClick={whatsappConnect}>
                    Comprar
                    <br />
                    {perfumePrices[selectedSize]}
                </h1>
            </div>

            {!single && <div className={styles.volumePicker}>
                {perfumeSizes.map((size, index) => (
                    <div
                        key={size}
                        onClick={() => changeSelectedSize(index)}
                        className={`${styles.sizeButton} ${selectedSize === index ? styles.goldenColor : ""
                            }`}
                    >
                        {size}
                    </div>
                ))}
            </div>}

            <div className={styles.title}>
                <p>
                    {!single ? (
                        <>
                            <strong>{perfumeInfo[2]}</strong> inspirado en{" "}
                            <strong>{perfumeInfo[0]}</strong> de{" "}
                            <strong>{perfumeInfo[1]}</strong>
                        </>
                    ) : (
                        <>
                            Ambientador aroma{" "}
                            <strong>{perfumeInfo[0]}</strong>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}
