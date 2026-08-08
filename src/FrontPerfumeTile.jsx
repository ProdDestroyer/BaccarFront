import styles from "./FrontPerfumeTile.module.css";

export const FrontPerfumeTile = ({ perfumeInfo }) => {

    console.log(`perfumeInfo[3] ${perfumeInfo[3]}`)
    return (
        <div className={styles.tile}>

            <div className={styles.imageWrapper}>
                <img
                    src={perfumeInfo[5]}
                    alt={perfumeInfo[1]}
                    className={styles.image}
                />
            </div>

            <div className={styles.title}>
                <strong>{perfumeInfo[2]}</strong> inspirado en{" "}
                <strong>{perfumeInfo[0]}</strong> de{" "}
                <strong>{perfumeInfo[1]}</strong>
            </div>

        </div>
    );
};