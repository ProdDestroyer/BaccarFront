const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const SHEET_ID = import.meta.env.VITE_SHEET_ID;


const fetchSheetRange = async (range) => {
    const url =
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/` +
        `${encodeURIComponent(range)}?key=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `Failed to fetch Google Sheets range "${range}": ${response.status}`
        );
    }

    const result = await response.json();

    return result.values ?? [];
};


const addTypeToRows = (rows, type) => {
    return rows.map((row) => {
        const newRow = [...row];

        newRow.type = type;

        return newRow;
    });
};


const loadSection = async (sections) => {

    // Load every section that has an excelRange
    const loadedSections = await Promise.all(
        sections.map(async (section) => {

            // "Todos" has no excelRange
            if (!section.excelRange) {
                return {
                    ...section,
                    data: []
                };
            }

            const rows = await fetchSheetRange(section.excelRange);

            return {
                ...section,
                data: addTypeToRows(rows, section.name)
            };
        })
    );


    // Find "Todos"
    const todosIndex = loadedSections.findIndex(
        (section) => section.name === "Todos"
    );


    // Merge all other sections into Todos
    if (todosIndex !== -1) {

        const allRows = loadedSections
            .filter((section) => section.name !== "Todos")
            .flatMap((section) => section.data);

        loadedSections[todosIndex] = {
            ...loadedSections[todosIndex],
            data: allRows
        };
    }


    return loadedSections;
};


export const loadAllSheetData = async ({
    bodilySection,
    homeSection,
    textilesSection,
    automotiveSection,
    frontLists
}) => {

    const [
        bodily,
        home,
        textiles,
        automotive,
        front
    ] = await Promise.all([

        loadSection(bodilySection),

        loadSection(homeSection),

        loadSection(textilesSection),

        loadSection(automotiveSection),

        loadSection(frontLists)

    ]);


    return {
        bodilySection: bodily,
        homeSection: home,
        textilesSection: textiles,
        automotiveSection: automotive,
        frontLists: front
    };
};