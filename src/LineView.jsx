import { useLocation, useNavigate } from "react-router-dom";
import styles from "./LineView.module.css";
import { useEffect, useRef, useState } from "react";
import { PerfumesPanel } from "./PerfumesPanel";
import { FeaturesBanner } from "./FeaturesBanner";
import { Footer } from "./Footer";
import { Spinner } from "./Spinner";
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const SHEET_ID = import.meta.env.VITE_SHEET_ID;

export const LineView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sections = location.state?.sections;
  const singleSize = location.state?.singleSize;
  const navBarTitle = location.state?.navBarTitle;
  const [menuShadow, setMenuShadow] = useState(sections[0].topShadow);
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
      const ranges = (sections.length > 1) ? sections.filter(section => (section.name != 'Todos')).map(section => (section.excelRange)) : [sections[0].excelRange];
      const lists = await Promise.all(
        ranges.map(range => fetchRange(range))
      );

      console.log(' ranges ', ranges);
      perfumesDraft.unshift(lists.flat());
      if (sections.length > 1) {
        for (let i = 0; i < lists.length; i++) {
          perfumesDraft.push(lists[i]);
        }
      }


      setPerfumes(perfumesDraft);
      setPerfumesList(perfumesDraft[0]);
      console.log('perfumesDraft ', perfumesDraft);
      setSelectedSet(0);
    };

    fetchData();
  }, [sections]);

  const imageRef = useRef(null);
  const [showNavbarLogo, setShowNavbarLogo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current) return;

      const rect = imageRef.current.getBoundingClientRect();

      // Going down
      if (!showNavbarLogo && rect.bottom <= 0) {
        setShowNavbarLogo(true);
      }

      // Coming back up
      if (showNavbarLogo && rect.bottom > 0) {
        setShowNavbarLogo(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showNavbarLogo]);

  const turnOnShadow = () => {
    if (!sections[selectedSet].topShadow) {
      setMenuShadow(true);
    }
  }
  const turnOffShadow = () => {
    if (!sections[selectedSet].topShadow) {
      setMenuShadow(false);
    }
  }

  const setBackgroundImageFacade = (index) => {
    setbackgroundImage(sections[index].imagePath);
    setSelectedSet(index);
    setPerfumesList(perfumes[index]);
  }

  return (
    <>
      <div className={styles.navBar}>
        {showNavbarLogo && <div className={`${styles.navBarImageContainer}`}>
          <div className={styles.navBarLogoContainer}
            onClick={() => navigate("/")}>
            <img src="/goldenLogo.png" alt="" />
          </div>
          <span>{navBarTitle}</span>
        </div>}
        {!showNavbarLogo &&
          <span>{navBarTitle}</span>}
      </div>
      <div className={styles.topMenuContainer} style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: `${sections[selectedSet].backgroundPosition}`
      }}>
        <div onMouseEnter={() => turnOnShadow()}
          onMouseLeave={() => turnOffShadow()}
          className={`${styles.logoWrapper} ${menuShadow || window.innerWidth <= 768 ? styles.shadowBackground : ''}`}>
          <div className={styles.topMenuImageContainer} onClick={() => navigate("/")}>
            <img ref={imageRef} src="/goldenLogo.png" alt="" />
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
        <FeaturesBanner></FeaturesBanner>
        {!perfumesList ? (
          <Spinner />
        ) : (
          <PerfumesPanel
            key={sections[selectedSet].name}
            perfumesList={perfumesList}
            sectionName={sections[selectedSet].name}
            singleSize={singleSize}
          />
        )}
      </div>
      {!!perfumesList && (<Footer></Footer>)}
    </>
  )
}