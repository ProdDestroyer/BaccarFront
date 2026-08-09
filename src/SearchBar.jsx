import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import styles from "./SearchBar.module.css";
import { useSheetData } from "./context/SheetDataContext";

export const SearchBar = () => {

    const {
        bodilySection,
        homeSection,
        textilesSection,
        automotiveSection,
        loading,
        error
    } = useSheetData();

    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [results, setResults] = useState([]);

    const containerRef = useRef(null);
    const inputRef = useRef(null);


    const perfumes = useMemo(() => {

        if (loading) {
            return [];
        }

        const allSections = [
            bodilySection,
            homeSection,
            textilesSection,
            automotiveSection
        ];

        return allSections
            .filter(Boolean)
            .flat()
            .filter(section => section.name !== "Todos")
            .flatMap(section => section.data || [])
            .map((row, index) => ({
                row,
                name: row[0],
                image: row.at(-2),
                type: row.type,
                id: `${row[0]}-${row.type}-${index}`
            }));

    }, [
        bodilySection,
        homeSection,
        textilesSection,
        automotiveSection,
        loading
    ]);


    const toggleSearch = (e) => {

        e.stopPropagation();

        if (open) {
            setOpen(false);
            setText("");
            setResults([]);
            return;
        }

        setOpen(true);

        requestAnimationFrame(() => {
            inputRef.current?.focus();
        });
    };


    useEffect(() => {

        const handleOutsideClick = (event) => {

            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                setOpen(false);
                setText("");
                setResults([]);
            }

        };

        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };

    }, []);


    useEffect(() => {

        if (!text.trim()) {
            setResults([]);
            return;
        }

        const timeout = setTimeout(() => {

            const searchText = text.toLowerCase().trim();

            const filtered = perfumes.filter(perfume =>
                perfume.name
                    ?.toString()
                    .toLowerCase()
                    .includes(searchText)
            );

            setResults(filtered);

        }, 400);

        return () => clearTimeout(timeout);

    }, [text, perfumes]);


    if (loading || error) {
        return null;
    }


    return (
        <div
            ref={containerRef}
            className={styles.container}
        >

            <button
                type="button"
                className={styles.searchButton}
                onClick={toggleSearch}
            >
                <Search
                    size={24}
                    strokeWidth={2}
                />
            </button>


            <input
                ref={inputRef}
                className={`${styles.input} ${open ? styles.open : ""}`}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Buscar perfume..."
            />


            {results.length > 0 && (
                <div className={styles.results}>

                    {results.slice(0, 3).map(result => (

                        <div
                            key={result.id}
                            className={styles.result}
                        >

                            <img
                                src={result.image}
                                alt=""
                                className={styles.resultImage}
                            />

                            <span className={styles.resultName}>
                                {result.name}
                            </span>

                        </div>

                    ))}


                    {results.length > 3 && (
                        <div className={styles.more}>
                            Más Resultados...
                        </div>
                    )}

                </div>
            )}

        </div>
    );
};