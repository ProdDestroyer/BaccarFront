import styles from "./FeaturesBanner.module.css";

export const FeaturesBanner = () => {
    return (
        <div className={styles.featuresContainer}>
            <div className={styles.feature}>
                <img src="/tailoredAdvice.png" alt="Asesoría personalizada" />
                <h5><strong> Asesoría personalizada</strong></h5>
                <h4 className={styles.subtitle}>Te ayudamos a encontrar tu fragancia</h4>
            </div>

            <div className={styles.feature}>
                <img src="/fastDelivery.png" alt="Envíos nacionales" />
                <h5><strong> Envíos nacionales en 24 horas</strong></h5>
                <h4 className={styles.subtitle}>Recibe tu compra tras 24 horas de ordenar</h4>
            </div>

            <div className={styles.feature}>
                <img src="/reviews.png" alt="Opiniones de clientes" />
                <h5><strong> ¿Qué opinan nuestros clientes?</strong></h5>
                <h4 className={styles.subtitle}>Qué dicen sobre nosotros</h4>
            </div>
        </div>
    );
};