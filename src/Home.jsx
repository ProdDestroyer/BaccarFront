import FloatingButtons from "./FloatingButtons";
import styles from "./Home.module.css";
import { SearchBar } from "./SearchBar";

export const Home = () => {
  return (
    <>
      <div className={styles.topPanel}>
        <div className={styles.frontMessageBox}>
          <SearchBar
            onSearch={(text) => console.log(text)}
          />
          <button className={styles.newPerfumesButton}>Nuevos Perfumes</button>
          <h1 className={`${styles.innerFrontMessageText} ${styles.firstFrontMessageTextLine}`}>Trasciende Tu <br /> Escencia</h1>
          <h5 className={styles.innerFrontMessageSubtext}>Hazte notar, descubre tu perfume</h5>
          <div className={styles.frontBottomButtonsContainer}>
            <button className={`${styles.button} ${styles.black}`}>
              <span>Ver Tendencias</span>
            </button>

            <button className={`${styles.button} ${styles.black}`}>
              <span>Ver Colección</span>
            </button>
          </div>
        </div>
        <FloatingButtons></FloatingButtons>
      </div >
    </>
  )
}
