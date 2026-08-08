import styles from "./FrontList.module.css";
import { FrontPerfumeTile } from "./FrontPerfumeTile";

export const FrontList = ({ perfumesInfo }) => {
    const {perfumesList, title} = perfumesInfo;
    return (
        <>
            <h2 className={styles.title}>{title}</h2>

            <div className={styles.tilesContainer}>
                {perfumesList.map((perfume, index) => (
                    <FrontPerfumeTile
                        key={index}
                        perfumeInfo={perfume}
                    />
                ))}
            </div>
        </>
    );
};