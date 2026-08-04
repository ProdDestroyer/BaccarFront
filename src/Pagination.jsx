import styles from "./PerfumesPanel.module.css";

export const Pagination = ({
    currentPage,
    totalPages,
    pages,
    setCurrentPage
}) => {
    return (
        <div className={styles.pagination}>
            <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
            >
                «
            </button>

            <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
            >
                ←
            </button>

            {pages.map(page => (
                <button
                    type="button"
                    key={page}
                    className={page === currentPage ? styles.activePage : ""}
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </button>
            ))}

            <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
            >
                →
            </button>

            <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(totalPages)}
            >
                »
            </button>
        </div>
    );
};