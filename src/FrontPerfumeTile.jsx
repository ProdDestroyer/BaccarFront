import styles from "./FrontPerfumeTile.module.css";
import { useNavigate } from "react-router-dom";
import { useSheetData } from "./context/SheetDataContext";
import { isSinglePresentation } from "./utils/utils";

export const FrontPerfumeTile = ({ perfumeInfo }) => {

    const navigate = useNavigate();

    const {
        bodilySection,
        homeSection,
        textilesSection,
        automotiveSection
    } = useSheetData();


    const openPerfumeDetail = () => {

        const allSections = [
            bodilySection,
            homeSection,
            textilesSection,
            automotiveSection
        ];

        const perfume = allSections
            .filter(Boolean)
            .flat()
            .filter(section => section.name !== "Todos")
            .flatMap(section => section.data || [])
            .map(row => ({
                row,
                name: row[1],
                image: row.at(-2),
                type: row.type,
                id: `${row[0]}`
            }))
            .find(perfume => perfume.id === `${perfumeInfo[0]}`);


        if (!perfume) {
            console.error(
                "Could not find perfume with id:",
                perfumeInfo[0]
            );
            return;
        }


        navigate("/perfumeDetail", {
            state: {
                result: perfume,
                corporal: isSinglePresentation(perfume.type),
            }
        });
    };


    return (
        <div className={styles.tile}>

            <div
                className={styles.imageWrapper}
                onClick={openPerfumeDetail}
            >

                <img
                    src={perfumeInfo[7]}
                    alt={perfumeInfo[2]}
                    className={styles.image}
                />

            </div>

            <div className={styles.title}>

                <strong>{perfumeInfo[3]}</strong> inspirado en{" "}
                <strong>{perfumeInfo[1]}</strong> de{" "}
                <strong>{perfumeInfo[2]}</strong>

            </div>

        </div>
    );
};
