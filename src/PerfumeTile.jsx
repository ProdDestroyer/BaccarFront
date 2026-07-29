import { useState } from "react";
import styles from "./PerfumeTile.module.css";
const backgroundImages = ['/30ml.jpg', '/60ml.PNG', '/100ml.jpg'];
const perfumeSizes = ['30ml', '60ml', '100ml'];
const perfumePrices = ['$25.000', '$35.000', '$60.000'];
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

export const PerfumeTile = ({ perfumeInfo }) => {
    const [selectedSize, setSelectedSize] = useState(0);


    const changeSelectedSize = (index) => {
        setSelectedSize(index);
    }
    const whatsappConnect = () => {
        const message = `Hola, estoy interesado(a) en el siguiente producto:\n*${perfumeInfo[2]}* inspirado en *${perfumeInfo[0]}* de *${perfumeInfo[1]}* *${perfumeSizes[selectedSize]}*`;
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank");
    }

    return (
        <div className={styles.tileContainer}>
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

            <div className={styles.volumePicker}>
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
            </div>

            <div className={styles.title}>
                <p>
                    <strong>{perfumeInfo[2]}</strong> inspirado en{" "}
                    <strong>{perfumeInfo[0]}</strong> de{" "}
                    <strong>{perfumeInfo[1]}</strong>
                </p>
            </div>
        </div>
    );
}
