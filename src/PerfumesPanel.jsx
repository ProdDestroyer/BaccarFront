import { useEffect, useRef, useState } from "react";
import styles from "./PerfumesPanel.module.css";
import { PerfumeTile } from "./PerfumeTile";

const ROWS_PER_PAGE = 5;

export const PerfumesPanel = ({ perfumesList, sectionName, singleSize }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [perfumesPerPage, setPerfumesPerPage] = useState(15);

    const gridRef = useRef(null);

    useEffect(() => {
        const updateColumns = () => {
            if (!gridRef.current) return;

            const computedStyle = window.getComputedStyle(gridRef.current);

            // Count how many grid columns currently exist
            const columns = computedStyle.gridTemplateColumns.split(" ").length;

            const newPerfumesPerPage = columns * ROWS_PER_PAGE;

            setPerfumesPerPage(newPerfumesPerPage);
            setCurrentPage(1);
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

    const firstPage = Math.max(
        1,
        Math.min(currentPage - 1, totalPages - 2)
    );

    const pages = Array.from(
        { length: Math.min(3, totalPages) },
        (_, i) => firstPage + i
    );

    const renderPagination = () =>
        totalPages > 1 && (
            <div className={styles.pagination}>
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(1)}
                >
                    «
                </button>

                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                >
                    ←
                </button>

                {pages.map(page => (
                    <button
                        key={page}
                        className={page === currentPage ? styles.activePage : ""}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </button>
                ))}

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => p + 1)}
                >
                    →
                </button>

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                >
                    »
                </button>
            </div>
        );

    return (
        <>
            {renderPagination()}

            <div
                ref={gridRef}
                className={styles.generalContainer}
            >
                {currentPerfumes.map((perfumeData, index) => (
                    <PerfumeTile
                        key={`${startIndex + index}-${sectionName}`}
                        perfumeInfo={perfumeData}
                        single={singleSize}
                    />
                ))}
            </div>

            {renderPagination()}
        </>
    );
};