import styles from "./FloatingButtons.module.css";

export const FloatingButtons = () => {
    return (
        <div className={styles.floatingButtons}>

            <a
                href="https://www.instagram.com/baccaroficial?igsh=MWw4czl5YXBiYWsxaQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.circleButton}
            >
                <img src="/floatingWhatsappWhite.png" alt="WhatsApp" />
            </a>
            <a
                href="https://www.instagram.com/baccaroficial?igsh=MWw4czl5YXBiYWsxaQ%3D%3D&utm_source=qr"
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