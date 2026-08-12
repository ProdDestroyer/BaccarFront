import { useNavigate } from "react-router-dom";
import styles from "./PerfumeTile.module.css";
import { useSheetData } from "./context/SheetDataContext";
import { isSinglePresentation } from "./utils/utils";

export const PerfumeTile = ({ perfumeInfo, single, prefix, modalOn, setWhatsappMessage, setVolumeSetString }) => {
    const {
        bodilySection,
        homeSection,
        textilesSection,
        automotiveSection
    } = useSheetData();
    const navigate = useNavigate();

    const backgroundImage = perfumeInfo[perfumeInfo.length - 2];
    const perfumePrices = perfumeInfo[perfumeInfo.length - 3].split(",");
    const whatsappMessage = perfumeInfo[perfumeInfo.length - 4];

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
            .flatMap(section =>
                (section.data || []).map(row => ({
                    row,
                    name: row[1],
                    image: row.at(-2),
                    type: section.type,
                    prefix: section.prefix,
                    id: `${row[0]}`
                }))
            )
            .find(perfume => perfume.id === `${perfumeInfo[0]}`);


        if (!perfume) {
            console.error(
                "Could not find perfume with id:",
                perfumeInfo[0]
            );
            return;
        }

        console.log('interested ', perfume);
        navigate("/perfumeDetail", {
            state: {
                result: perfume,
                corporal: isSinglePresentation(perfume.type),
            }
        });
    };

    return (
        <div className={styles.tile}>

            <div className={styles.imageWrapper} onClick={openPerfumeDetail}>

                {backgroundImage && <img
                    src={backgroundImage}
                    alt={perfumeInfo[0]}
                    className={styles.image}
                />}

                <div
                    className={styles.buyOverlay}
                    onClick={(e) => {
                        e.stopPropagation();
                        setWhatsappMessage(whatsappMessage);
                        setVolumeSetString(perfumeInfo[perfumeInfo.length-1]);
                        modalOn(single ? backgroundImage : null);
                    }}
                >
                    Comprar
                    <br />
                    {`${perfumePrices[0]}${single ? "" : ` - ${perfumePrices[2]}`}`}
                </div>

            </div>

            <div className={styles.title}>

                {!single ? (
                    <>
                        <strong>{perfumeInfo[3]}</strong>{" "}
                        inspirado en{" "}
                        <strong>{perfumeInfo[1]}</strong>{" "}
                        de{" "}
                        <strong>{perfumeInfo[2]}</strong>
                    </>
                ) : (
                    <>
                        {prefix} aroma{" "}
                        <strong>{perfumeInfo[1]}</strong>
                    </>
                )}

            </div>

        </div>
    );
};