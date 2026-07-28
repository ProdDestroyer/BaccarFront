import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

export const Navbar = () => {

    const [openMenu, setOpenMenu] = useState(null);
    const navigate = useNavigate();

    return (
        <>
            <div className={styles.navBar}>
                <div className={styles.titleItem}>
                    <img src="./goldenLogo.png" alt="Logo" />
                    <span>Baccar</span>
                </div>

                <ul className={styles.itemsContainer}>
                    <li className={styles.navItem}>

                        <span>Inicio</span>
                    </li>
                    <li className={styles.navItem}>
                        <span>Perfumes</span>
                    </li>
                    <li className={styles.navItem}>
                        <span>Marcas</span>
                    </li>
                    <li
                        className={styles.navItem}
                        onMouseEnter={() => setOpenMenu("collections")}
                        onMouseLeave={() => setOpenMenu(null)}
                    >
                        <span>Colecciones</span>

                        <ul
                            className={`${styles.submenu} ${openMenu === "collections" ? styles.open : ""
                                }`}
                            onMouseEnter={() => setOpenMenu("collections")}
                            onMouseLeave={() => setOpenMenu(null)}
                        >
                            <li
                                onClick={() => navigate("/corporalView")}
                                className={styles.subMenuItem}
                            >
                                Corporal
                            </li>
                            <li className={styles.subMenuItem}>Textil</li>
                            <li className={styles.subMenuItem}>Hogar</li>
                            <li className={styles.subMenuItem}>Automotriz</li>
                        </ul>
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