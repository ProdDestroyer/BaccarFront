import styles from "./FrontList.module.css";
import { FrontPerfumeTile } from "./FrontPerfumeTile";

export const FrontList = ({ perfumesInfo }) => {

    const {data: perfumesList, category} = perfumesInfo;
    console.log('frontlist ', perfumesInfo);
    return (
        <>
            <h2 className={styles.title}>{category}</h2>

            <div className={styles.tilesContainer}>
                {perfumesList?.map((perfume, index) => (
                    <FrontPerfumeTile
                        key={index}
                        perfumeInfo={perfume}
                    />
                ))}
            </div>
        </>
    );
};