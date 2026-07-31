import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dbData from './DB'
import styles from "./Navbar.module.css";

export const Navbar = () => {
    const { bodilySection, homeSection, textilesSection, automotiveSection } = dbData;
    const [openMenu, setOpenMenu] = useState(null);
    const navigate = useNavigate();
    const isTouchDevice = window.matchMedia("(hover: none)").matches;

    return (
        <>
            <div className={styles.navBar}>
                <div className={styles.titleItem}>
                    <img src="./goldenLogo.png" alt="Logo" />
                    {/* <span>Baccar</span> */}
                </div>

                <ul className={styles.itemsContainer}>
                    <li className={styles.navItem}>

                        <span>Inicio</span>
                    </li>
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
                                    navBarTitle: 'Hogar'
                                },
                            })}
                                className={styles.subMenuItem}>
                                Hogar
                            </li>
                            <li onClick={() => navigate("/textilesView", {
                                state: {
                                    sections: textilesSection,
                                    singleSize: true,
                                    navBarTitle: 'Textil'
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
                                },
                            })}
                                className={styles.subMenuItem}>
                                Automotriz
                            </li>
                        </ul>
                    </li>
                    <li className={styles.navItem}>
                        <span>Marcas</span>
                    </li>
                    <li className={styles.navItem}>
                        <span>Novedades</span>
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