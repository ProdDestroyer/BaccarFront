import styles from "./FloatingButtons.module.css";

export const FloatingButtons = () => {
    return (
        <div className={styles.floatingButtons}>
            <button className={styles.circleButton}>
                <img src="/floatingWhatsappWhite.png" alt="WhatsApp" />
            </button>

            <button className={styles.circleButton}>
                <img src="/floatingLocationWhite.png" alt="Location" />
            </button>

            <button className={styles.circleButton}>
                <img src="/floatingNewsletterWhite.png" alt="Shopping" />
            </button>
        </div>
    );
};

export default FloatingButtons;