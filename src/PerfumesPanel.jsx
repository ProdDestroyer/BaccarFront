import { useEffect } from "react";
import styles from "./PerfumesPanel.module.css";
import { PerfumeTile } from "./PerfumeTile";
export const PerfumesPanel = ({perfumesList}) => {
    useEffect(() => {
    }, [perfumesList])
  return (
    <>
    <div className={styles.generalContainer}>
        {perfumesList.map((perfumeData, index) => (
            <PerfumeTile key={index} perfumeInfo={perfumeData}></PerfumeTile>
        ))}
    </div>
    </>
  )
}
