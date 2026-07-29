import styles from "./BodilyLineView.module.css";
import { useEffect, useState } from "react";
import { PerfumesPanel } from "./PerfumesPanel";
const backgroundImages = ['/goldenFemaleModel.jpg', '/goldenMaleModel.jpg', '/goldenCouple.jpg', '/goldenCouple2.jpg'];
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const SHEET_ID = import.meta.env.VITE_SHEET_ID;
const TOP_PANEL_FOOTER_TITLES = ['Perfumes de Mujer','Perfumes de Hombre','Perfumes Unisex','Perfumes Corporales'];

export const BodilyLineView = () => {
  const [menuShadow, setMenuShadow] = useState(false);
  const [backgroundImage, setbackgroundImage] = useState(backgroundImages[0]);
  const [backgroundPosition, setBackgroundPosition] = useState('center');
  const [perfumes, setPerfumes] = useState([]);
  const [perfumesList, setPerfumesList] = useState(perfumes[1]);
  const [selectedSet, setSelectedSet] = useState(0);

  const fetchRange = async (range) => {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(range)}?key=${API_KEY}`
    );

    const data = await response.json();
    return data.values;
  };

  useEffect(() => {
    const fetchData = async () => {
      const perfumesDraft = [];
      const [
        femaleList,
        maleList,
        unisexList,
      ] = await Promise.all([
        fetchRange("'Esencias y Sensaciones'!B7:D103"),
        fetchRange("'Esencias y Sensaciones'!B107:D201"),
        fetchRange("'Esencias y Sensaciones'!B205:D218")
      ]);

      perfumesDraft.push(femaleList);
      perfumesDraft.push(maleList);
      perfumesDraft.push(unisexList);

      setPerfumes(perfumesDraft);
      setPerfumesList(perfumesDraft[0]);
      setSelectedSet(0);
    };

    fetchData();
  }, []);

  const turnOnShadow = () => {
    setMenuShadow(true);
  }
  const turnOffShadow = () => {
    setMenuShadow(false);
  }

  const setBackgroundImageFacade = (index) => {
    setbackgroundImage(backgroundImages[index]);
    setSelectedSet(index);
    switch (index) {
      case 0:
        setBackgroundPosition('center');
        setPerfumesList(perfumes[0]);
        break;
      case 1:
        setBackgroundPosition('center');
        setPerfumesList(perfumes[1]);
        break;
      case 2:
        setBackgroundPosition('top center');
        setPerfumesList(perfumes[2]);
        break;
      case 3:
        setBackgroundPosition('center');
        setPerfumesList(perfumes.flat());
        break;
    }
  }

  return (
    <>
      <div className={styles.navBar}>
        <span>Corporal</span>
      </div>
      <div className={styles.topMenuContainer} style={{ backgroundImage: `url(${backgroundImage})`, backgroundPosition }}>
        <div onMouseEnter={() => turnOnShadow()}
          onMouseLeave={() => turnOffShadow()}
          className={`${styles.logoWrapper} ${menuShadow || window.innerWidth <= 768? styles.shadowBackground : ''}`}>
          <div className={styles.topMenuImageContainer}>
            <img src="/goldenLogo.png" alt="" />
          </div>
        </div>
        <div
          className={`${styles.topMenuItems} ${menuShadow || window.innerWidth <= 768? `${styles.shadowBackground} ${styles.whiteColor}` : ""}`}
          onMouseEnter={() => turnOnShadow()}
          onMouseLeave={() => turnOffShadow()}>
          <span onClick={() => setBackgroundImageFacade(3)} style={{color: `${selectedSet == 3 ? `rgb(212, 175, 55)` : `white`}`}}>Todos</span>
          <span onClick={() => setBackgroundImageFacade(1)} style={{color: `${selectedSet == 1 ? `rgb(212, 175, 55)` : `white`}`}}>Hombre</span>
          <span onClick={() => setBackgroundImageFacade(0)} style={{color: `${selectedSet == 0 ? `rgb(212, 175, 55)` : `white`}`}}>Mujer</span>
          <span onClick={() => setBackgroundImageFacade(2)} style={{color: `${selectedSet == 2 ? `rgb(212, 175, 55)` : `white`}`}}>Unisex</span>
        </div>
        <h1 className={styles.topPanelFooterTitle}>{TOP_PANEL_FOOTER_TITLES[selectedSet]}</h1>
      </div>
      <div className={styles.perfumesPanelContainer}>
        {!!perfumesList && <PerfumesPanel perfumesList={perfumesList} sectionName={TOP_PANEL_FOOTER_TITLES[selectedSet]}></PerfumesPanel>}
      </div>
    </>
  )
}
