import { useRef } from "react";
import FloatingButtons from "./FloatingButtons";
import { FrontList } from "./FrontList";
import styles from "./Home.module.css";
import { SearchBar } from "./SearchBar";
import { useSheetData } from "./context/SheetDataContext";

export const Home = () => {
  const {
    frontLists
  } = useSheetData();
  const frontPerfumesLists = frontLists;
  console.log('home: ', frontLists);

  const frontListRefs = useRef({});

  const scrollToList = (title) => {
    frontListRefs.current[title]?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

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
          {frontPerfumesLists?.map((frontPerfumeList, index) => (
            <div
              key={index}
              className={styles.frontListAnchor}
              ref={(element) => {
                frontListRefs.current[frontPerfumeList.category] = element;
              }}
            >
              <FrontList
                perfumesInfo={frontPerfumeList}
              />
            </div>
          ))}
      </div>
    </>
  )
}
