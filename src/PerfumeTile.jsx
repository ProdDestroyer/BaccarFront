import { useState } from "react";
import styles from "./PerfumeTile.module.css";
const backgroundImages = ['/30ml.jpg', '/60ml.jpg', '/100ml.PNG'];
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

export const PerfumeTile = ({ perfumeInfo }) => {
    const [backgroundImage, setBackgroundImage] = useState(backgroundImages[0]);
    const [selectedSize, setSelectedSize] = useState(0);
    const isMobile = window.innerWidth <= 768;

    const changeSelectedSize = (index) => {
        setBackgroundImage(backgroundImages[index]);
        setSelectedSize(index);
    }
    const whatsappConnect = () => {
        const message = `Hola, estoy interesado(a) en el siguiente producto:\n*${perfumeInfo[2]}* inspirado en *${perfumeInfo[0]}* de *${perfumeInfo[1]}*`;
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank");
    }

    return (
        <>
            <div className={styles.tileContainer}>
                {isMobile && 
                <div className={styles.perfumeImageContainerMobile} style={{ backgroundImage: `url(${backgroundImage})` }}>
                    <h1 onClick={() => whatsappConnect()}>Comprar</h1>
                </div>}
                {!isMobile && 
                <div className={styles.perfumeImageContainer} style={{ backgroundImage: `url(${backgroundImage})` }}>
                    <h1 onClick={() => whatsappConnect()}>Comprar</h1>
                </div>}
                <div className={styles.volumePicker}>
                    <div onClick={() => changeSelectedSize(0)} className={`${styles.sizeButton} ${selectedSize == 0 ? styles.goldenColor : ''}`} >30ml</div>
                    <div onClick={() => changeSelectedSize(1)} className={`${styles.sizeButton} ${selectedSize == 1 ? styles.goldenColor : ''}`} >60ml</div>
                    <div onClick={() => changeSelectedSize(2)} className={`${styles.sizeButton} ${selectedSize == 2 ? styles.goldenColor : ''}`} >100ml</div>
                </div>
                <div className={styles.title}>
                    <p><strong>{perfumeInfo[2]}</strong> inspirado en <strong>{perfumeInfo[0]}</strong> de <strong>{perfumeInfo[1]}</strong></p>
                </div>
            </div>
        </>
    )
}
