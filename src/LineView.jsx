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
  const prefix = location.state?.prefix;
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
      const ranges = (sections.length > 1) ? sections.filter(section => (section.category != 'Todos')).map(section => (section.excelRange)) : [sections[0].excelRange];
      const lists = await Promise.all(
        ranges.map(range => fetchRange(range))
      );

      perfumesDraft.unshift(lists.flat());
      if (sections.length > 1) {
        for (let i = 0; i < lists.length; i++) {
          perfumesDraft.push(lists[i]);
        }
      }


      setPerfumes(perfumesDraft);
      setPerfumesList(perfumesDraft[0]);
      setSelectedSet(0);
    };

    fetchData();
  }, [sections]);

  const imageRef = useRef(null);
  const [showNavbarLogo, setShowNavbarLogo] = useState(false);

useEffect(() => {
    const node = imageRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
        ([entry]) => setShowNavbarLogo(!entry.isIntersecting),
        { rootMargin: "-60px 0px 0px 0px", threshold: 0 }
    );

    observer.observe(node);
    return () => observer.disconnect();
}, []);

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
        <div
          className={`${styles.navBarImageContainer} ${showNavbarLogo
              ? styles.navBarLogoVisible
              : styles.navBarLogoHidden
            }`}
        >
          <div
            className={styles.navBarLogoContainer}
            onClick={() => navigate("/")}
          >
            <img src="/goldenLogo.png" alt="" />
          </div>

          <span>{navBarTitle}</span>
        </div>
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
          <div ref={imageRef} className={styles.topMenuImageContainer} onClick={() => navigate("/")}>
            <img src="/goldenLogo.png" alt="" />
          </div>
        </div>
        <div
          className={`${styles.topMenuItems} ${menuShadow || window.innerWidth <= 768 ? `${styles.shadowBackground} ${styles.whiteColor}` : ""}`}
          onMouseEnter={() => turnOnShadow()}
          onMouseLeave={() => turnOffShadow()}>
          {sections.map(section => (section.category)).map((sectionName, index) => (
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
            key={sections[selectedSet].category}
            perfumesList={perfumesList}
            sectionName={sections[selectedSet].category}
            singleSize={singleSize}
            prefix={prefix}
          />
        )}
      </div>
      {!!perfumesList && (<Footer></Footer>)}
    </>
  )
}