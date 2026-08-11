import { createContext, useContext, useEffect, useState } from "react";

import {
    bodilySection,
    homeSection,
    textilesSection,
    automotiveSection,
    frontLists
} from "../data/sections";

import { loadAllSheetData } from "../data/loadSheetData";


const SheetDataContext = createContext(null);


export const SheetDataProvider = ({ children }) => {

    console.log('here', frontLists);
    const [sheetData, setSheetData] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);


    useEffect(() => {

        const loadData = async () => {

            try {

                setLoading(true);

                const data = await loadAllSheetData({
                    bodilySection,
                    homeSection,
                    textilesSection,
                    automotiveSection,
                    frontLists
                });

                setSheetData(data);
                console.log('sheetData', data);
            } catch (error) {

                console.error(
                    "Error loading Google Sheets data:",
                    error
                );

                setError(error);

            } finally {

                setLoading(false);

            }
        };


        loadData();

    }, []);


    return (
        <SheetDataContext.Provider
            value={{
                ...sheetData,
                loading,
                error
            }}
        >
            {children}
        </SheetDataContext.Provider>
    );
};


export const useSheetData = () => {

    const context = useContext(SheetDataContext);

    if (!context) {
        throw new Error(
            "useSheetData must be used inside SheetDataProvider"
        );
    }

    return context;
};