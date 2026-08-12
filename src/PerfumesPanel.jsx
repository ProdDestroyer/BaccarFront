import { useEffect, useRef, useState } from "react";
import styles from "./PerfumesPanel.module.css";
import { PerfumeTile } from "./PerfumeTile";
import { Pagination } from "./Pagination";

const ROWS_PER_PAGE = 5;
const PAGE_GROUP_SIZE = 3;

export const PerfumesPanel = ({ perfumesList, sectionName, singleSize, prefix, modalOn, setWhatsappMessage, setVolumeSetString }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [perfumesPerPage, setPerfumesPerPage] = useState(15);
    const gridRef = useRef(null);

    useEffect(() => {
        const updateColumns = () => {
            if (!gridRef.current) return;

            const computedStyle = window.getComputedStyle(gridRef.current);

            const columns = computedStyle.gridTemplateColumns
                .split(" ")
                .length;

            setPerfumesPerPage(columns * ROWS_PER_PAGE);
        };

        updateColumns();

        window.addEventListener("resize", updateColumns);

        return () => window.removeEventListener("resize", updateColumns);
    }, []);

    const totalPages = Math.ceil(perfumesList.length / perfumesPerPage);

    const startIndex = (currentPage - 1) * perfumesPerPage;

    const currentPerfumes = perfumesList.slice(
        startIndex,
        startIndex + perfumesPerPage
    );

    let firstPage =
        Math.floor((currentPage - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;

    if (totalPages - firstPage + 1 < PAGE_GROUP_SIZE) {
        firstPage = Math.max(1, totalPages - PAGE_GROUP_SIZE + 1);
    }

    const pages = Array.from(
        {
            length: Math.min(PAGE_GROUP_SIZE, totalPages),
        },
        (_, i) => firstPage + i
    );

    return (
        <>
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    pages={pages}
                    setCurrentPage={setCurrentPage}
                />
            )}

            <div
                ref={gridRef}
                className={styles.generalContainer}
            >
                {currentPerfumes.map((perfumeData, index) => (
                    <PerfumeTile
                        prefix={prefix}
                        key={`${startIndex + index}-${sectionName}`}
                        perfumeInfo={perfumeData}
                        single={singleSize}
                        modalOn={modalOn}
                        setWhatsappMessage={setWhatsappMessage}
                        setVolumeSetString={setVolumeSetString}
                    />
                ))}
            </div>

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    pages={pages}
                    setCurrentPage={setCurrentPage}
                />
            )}
        </>
    );
};