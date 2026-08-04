import styles from './Footer.module.css'

export const Footer = () => {
    return (
        <>
            <div className={styles.footerContainer}>
                <div className={styles.footerSection}>
                    <h4>Ayuda</h4>
                    <div className={styles.subItemsContainer}>
                        <h3>Estado de tu pedido</h3>
                        <h3>Envíos</h3>
                        <h3>Contacto</h3>
                    </div>
                </div>
                <div className={styles.footerSection}>
                    <h4>Legal</h4>
                    <div className={styles.subItemsContainer}>
                        <h3>Términos de servicio</h3>
                        <h3>Política de reembolso</h3>
                        <h3>Política de envíos</h3>
                        <h3>Cambios, garantías y devoluciones</h3>
                        <h3>Política de pago</h3>
                    </div>
                </div>
                <div className={styles.footerSection}>
                    <h4>Nosotros</h4>
                    <h3 className={styles.descriptionText}>Somos un grupo de expertos en perfumería y fragancias,
                        con una trayectoria de legado construída con esfuerzo,
                        excelencia y honestidad</h3>
                </div>
            </div>
        </>
    )
}
