import styles from "./FloatingButtons.module.css";
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;
const WHATSAPP_MESSAGE = 'Hola quisiera ser atendido(a) por este medio';
const LOCATION_MESSAGE = 'Hola quisiera saber dónde están ubicados';

export const FloatingButtons = () => {


    const whatsappConnect = (message) => {
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank");
    }

    return (
        <div className={styles.floatingButtons}>

            <a
                onClick={() => whatsappConnect(WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.circleButton}
                >
                <img src="/floatingWhatsappWhite.png" alt="WhatsApp" />
            </a>
            <a
                onClick={() => whatsappConnect(LOCATION_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.circleButton}
            >
                <img src="/floatingLocationWhite.png" alt="Location" />
            </a>
            <a
                href="https://www.instagram.com/baccaroficial?igsh=MWw4czl5YXBiYWsxaQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.circleButton}
            >
                <img src="/floatingInstagram.png" alt="Instagram" />
            </a>
        </div>
    );
};

export default FloatingButtons;