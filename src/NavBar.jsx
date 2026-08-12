import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useSheetData } from "./context/SheetDataContext";

export const Navbar = () => {
    const {
        bodilySection,
        homeSection,
        textilesSection,
        automotiveSection,
        loading,
        error
    } = useSheetData();
    const [openMenu, setOpenMenu] = useState(null);
    const navigate = useNavigate();
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <>
            <div className={styles.navBar}>
                <div className={styles.titleItem} onClick={() => scrollToTop()}>
                    <img src="./goldenLogo.png" alt="Logo" />
                    {/* <span>Baccar</span> */}
                </div>

                <ul className={styles.itemsContainer}>
                    {/* <li className={styles.navItem}>

                        <span>Inicio</span>
                    </li> */}
                    <li
                        className={styles.navItem}
                        onMouseEnter={
                            !isTouchDevice ? () => setOpenMenu("perfumes") : undefined
                        }
                        onMouseLeave={
                            !isTouchDevice ? () => setOpenMenu(null) : undefined
                        }
                        onClick={
                            isTouchDevice
                                ? () =>
                                    setOpenMenu(openMenu === "perfumes" ? null : "perfumes")
                                : undefined
                        }
                    >
                        <span>Perfumes</span>

                        <ul
                            className={`${styles.submenu} ${openMenu === "perfumes" ? styles.open : ""
                                }`}>
                            <li
                                onClick={() => navigate("/corporalView", {
                                    state: {
                                        sections: bodilySection,
                                        singleSize: false,
                                        navBarTitle: 'Corporal'
                                    },
                                })}
                                className={styles.subMenuItem}
                            >
                                Corporal
                            </li>
                            <li onClick={() => navigate("/homeView", {
                                state: {
                                    sections: homeSection,
                                    singleSize: true,
                                    navBarTitle: 'Hogar',
                                    prefix: 'Difusor',
                                },
                            })}
                                className={styles.subMenuItem}>
                                Hogar
                            </li>
                            <li onClick={() => navigate("/textilesView", {
                                state: {
                                    sections: textilesSection,
                                    singleSize: true,
                                    navBarTitle: 'Textil',
                                    prefix: 'Aromatizante',
                                },
                            })}
                                className={styles.subMenuItem}>
                                Textil
                            </li>
                            <li onClick={() => navigate("/automotiveView", {
                                state: {
                                    sections: automotiveSection,
                                    singleSize: true,
                                    navBarTitle: 'Automotriz',
                                    prefix: 'Ambientador',
                                },
                            })}
                                className={styles.subMenuItem}>
                                Automotriz
                            </li>
                        </ul>
                    </li>
                    <li className={styles.navItem}>
                        <span>Conócenos</span>
                    </li>
                    <li className={styles.navItem}>
                        <span>Haz Parte</span>
                    </li>

                    <li className={styles.navItem}>
                        <span>Contacto</span>
                    </li>
                </ul>
                {/* <button>☰</button> */}
            </div>
        </>
    );
};

export default Navbar;