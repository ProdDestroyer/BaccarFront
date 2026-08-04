import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import styles from "./SearchBar.module.css";

const perfumes = [
    { id: 1, name: "Sauvage Dior" },
    { id: 2, name: "Bleu de Chanel" },
    { id: 3, name: "Acqua di Gio" },
    { id: 4, name: "One Million" },
    { id: 5, name: "Invictus" },
    { id: 6, name: "Baccarat Rouge 540" },
    { id: 7, name: "Eros Versace" },
    { id: 8, name: "Black Orchid" },
    { id: 9, name: "Le Male" },
    { id: 10, name: "Good Girl" }
];

export const SearchBar = () => {

    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [results, setResults] = useState([]);

    const containerRef = useRef(null);
    const inputRef = useRef(null);

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

            const filtered = perfumes.filter(perfume =>
                perfume.name
                    .toLowerCase()
                    .includes(text.toLowerCase())
            );

            setResults(filtered);

        }, 400);

        return () => clearTimeout(timeout);

    }, [text]);

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
                            {result.name}
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