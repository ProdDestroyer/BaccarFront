import styles from './Spinner.module.css'

export const Spinner = () => {
    return (
        <div className={styles.loadingSection}>
            <div className={styles.spinner}></div>
        </div>
    )
}
