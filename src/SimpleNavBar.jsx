import { useNavigate } from "react-router-dom";
import styles from "./SimpleNavbar.module.css";

export const SimpleNavBar = ({ title }) => {

    const navigate = useNavigate();

    return (
        <div className={styles.navBar}>

            <div
                className={styles.logoContainer}
                onClick={() => navigate("/")}
            >
                <img
                    src="/goldenLogo.png"
                    alt=""
                />
            </div>

            <span className={styles.title}>
                {title}
            </span>

        </div>
    );
};