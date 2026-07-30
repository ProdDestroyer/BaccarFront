import { useLocation } from "react-router-dom";
import styles from "./LineView.module.css";
import { useEffect, useState } from "react";
import { PerfumesPanel } from "./PerfumesPanel";
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const SHEET_ID = import.meta.env.VITE_SHEET_ID;

export const LineView = () => {
  const location = useLocation();
  const sections = location.state?.sections;
  const singleSize = location.state?.singleSize;
  const navBarTitle = location.state?.navBarTitle;
  const [menuShadow, setMenuShadow] = useState(false);
  const [backgroundImage, setbackgroundImage] = useState(sections[0].imagePath);
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
      const ranges = sections.filter(section => (section.name != 'Todos')).map(section => (section.excelRange));
      const lists = await Promise.all(
        ranges.map(range => fetchRange(range))
      );

      perfumesDraft.unshift(lists.flat());
      for (let i = 0; i < lists.length; i++) {
        perfumesDraft.push(lists[i]);
      }


      setPerfumes(perfumesDraft);
      setPerfumesList(perfumesDraft[0]);
      console.log(perfumesDraft);
      setSelectedSet(0);
    };

    fetchData();
  }, [sections]);

  const turnOnShadow = () => {
    setMenuShadow(true);
  }
  const turnOffShadow = () => {
    setMenuShadow(false);
  }

  const setBackgroundImageFacade = (index) => {
    setbackgroundImage(sections[index].imagePath);
    setSelectedSet(index);
    setPerfumesList(perfumes[index]);
  }

  return (
    <>
      <div className={styles.navBar}>
        <span>{navBarTitle}</span>
      </div>
      <div className={styles.topMenuContainer} style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: `${sections[selectedSet].backgroundPosition}`
      }}>
        <div onMouseEnter={() => turnOnShadow()}
          onMouseLeave={() => turnOffShadow()}
          className={`${styles.logoWrapper} ${menuShadow || window.innerWidth <= 768 ? styles.shadowBackground : ''}`}>
          <div className={styles.topMenuImageContainer}>
            <img src="/goldenLogo.png" alt="" />
          </div>
        </div>
        <div
          className={`${styles.topMenuItems} ${menuShadow || window.innerWidth <= 768 ? `${styles.shadowBackground} ${styles.whiteColor}` : ""}`}
          onMouseEnter={() => turnOnShadow()}
          onMouseLeave={() => turnOffShadow()}>
          {sections.map(section => (section.name)).map((sectionName, index) => (
            <span key={index} onClick={() => setBackgroundImageFacade(index)} style={{ color: `${selectedSet == index ? `rgb(212, 175, 55)` : `white`}` }}>{sectionName}</span>
          ))}
        </div>
        <h1 className={styles.topPanelFooterTitle}>{sections[selectedSet].bannerText}</h1>
      </div>
      <div className={styles.perfumesPanelContainer}>
        {!!perfumesList && <PerfumesPanel perfumesList={perfumesList} sectionName={sections[selectedSet].name} singleSize={singleSize}></PerfumesPanel>}
      </div>
    </>
  )
}
