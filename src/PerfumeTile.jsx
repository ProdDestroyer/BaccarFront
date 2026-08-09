import styles from "./PerfumeTile.module.css";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

export const PerfumeTile = ({ perfumeInfo, single }) => {

    const backgroundImage = perfumeInfo[perfumeInfo.length - 2];
    const perfumePrices = perfumeInfo[perfumeInfo.length - 3].split(",");
    const whatsappMessage = perfumeInfo[perfumeInfo.length - 4];

    const whatsappConnect = () => {

        const message =
            `Hola, estoy interesado(a) en el siguiente producto:\n${whatsappMessage}`;

        const url =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank");
    };

    return (
        <div className={styles.tile}>

            <div className={styles.imageWrapper}>

                {backgroundImage && <img
                    src={backgroundImage}
                    alt={perfumeInfo[0]}
                    className={styles.image}
                />}

                <div
                    className={styles.buyOverlay}
                    onClick={whatsappConnect}
                >
                    Comprar
                    <br />
                    {`${perfumePrices[0]}${single ? "" : ` - ${perfumePrices[2]}`}`}
                </div>

            </div>

            <div className={styles.title}>

                {!single ? (
                    <>
                        <strong>{perfumeInfo[3]}</strong>{" "}
                        inspirado en{" "}
                        <strong>{perfumeInfo[1]}</strong>{" "}
                        de{" "}
                        <strong>{perfumeInfo[2]}</strong>
                    </>
                ) : (
                    <>
                        Ambientador aroma{" "}
                        <strong>{perfumeInfo[1]}</strong>
                    </>
                )}

            </div>

        </div>
    );
};