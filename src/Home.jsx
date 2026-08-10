import { useEffect, useState, useRef } from "react";
import FloatingButtons from "./FloatingButtons";
import { FrontList } from "./FrontList";
import styles from "./Home.module.css";
import { SearchBar } from "./SearchBar";
import dbData from './DB'
import { Spinner } from "./Spinner";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const SHEET_ID = import.meta.env.VITE_SHEET_ID;

export const Home = () => {
  const { frontLists } = dbData;
  const [frontPerfumesLists, setFrontPerfumesLists] = useState([]);
  const [loading, setLoading] = useState(true);

  const frontListRefs = useRef({});

  const scrollToList = (title) => {
    frontListRefs.current[title]?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  const fetchRange = async (range) => {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(range)}?key=${API_KEY}`
    );

    const data = await response.json();
    return data.values;
  };

  useEffect(() => {
    if (frontLists.length > 1) {
      const fetchData = async () => {
        const perfumesDraft = [];
        const ranges = frontLists.map(section => (section.excelRange));
        const lists = await Promise.all(
          ranges.map(range => fetchRange(range))
        );
        for (let i = 0; i < frontLists.length; i++) {
          perfumesDraft.push({ title: frontLists[i].title, perfumesList: lists[i] });
        }


        setFrontPerfumesLists(perfumesDraft);
        setLoading(false);
      };

      fetchData();

    }
  }, [frontLists]);

  return (
    <>
      <div className={styles.topPanel}>
        <div className={styles.frontMessageBox}>
          <SearchBar
            onSearch={(text) => console.log(text)}
          />
          <button className={styles.newPerfumesButton} onClick={() => scrollToList("Novedades")}>Nuevos Perfumes</button>
          <h1 className={`${styles.innerFrontMessageText} ${styles.firstFrontMessageTextLine}`}>Trasciende Tu <br /> Escencia</h1>
          <h5 className={styles.innerFrontMessageSubtext}>Hazte notar, descubre tu aroma <br /> con los mejores perfumes inspirados</h5>
          <div className={styles.frontBottomButtonsContainer}>
            <button className={`${styles.button} ${styles.black}`} onClick={() => scrollToList("Novedades")}>
              <span>Ver Novedades</span>
            </button>

            <button className={`${styles.button} ${styles.black}`} onClick={() => scrollToList("Tendencias")}>
              <span>Ver Tendencias</span>
            </button>
          </div>
        </div>
        <FloatingButtons></FloatingButtons>
      </div >
      <div className={styles.frontListsContainer}>
        {loading ? (
          <Spinner />
        ) : (
          frontPerfumesLists.map((frontPerfumeList, index) => (
            <div
              key={index}
              className={styles.frontListAnchor}
              ref={(element) => {
                frontListRefs.current[frontPerfumeList.title] = element;
              }}
            >
              <FrontList
                perfumesInfo={frontPerfumeList}
              />
            </div>
          ))
        )}
      </div>
    </>
  )
}
