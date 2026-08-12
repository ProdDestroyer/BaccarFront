export const bodilySection = [
    {
        category: 'Todos',
        type: 'corporal',
        imagePath: '/goldenCouple2.jpg',
        bannerText: 'Todos los Perfumes',
        backgroundPosition: 'center',
        topShadow: false
    },
    {
        category: 'Mujer',
        type: 'corporal',
        imagePath: '/goldenFemaleModel.jpg',
        excelRange: "'Esencias y Sensaciones'!B7:L103",
        bannerText: 'Perfumes Para Mujer',
        backgroundPosition: 'center',
        topShadow: false
    },
    {
        category: 'Hombre',
        type: 'corporal',
        imagePath: '/goldenMaleModel.jpg',
        excelRange: "'Esencias y Sensaciones'!B107:L201",
        bannerText: 'Perfumes Para Hombre',
        backgroundPosition: 'center',
        topShadow: false
    },
    {
        category: 'Unisex',
        type: 'corporal',
        imagePath: '/goldenCouple.jpg',
        excelRange: "'Esencias y Sensaciones'!B205:L218",
        bannerText: 'Perfumes Unisex',
        backgroundPosition: 'center',
        topShadow: false
    }
];

export const homeSection = [
    {
        category: 'Todos',
        type: 'home',
        prefix: 'Difusor',
        imagePath: '/Home.jpg',
        bannerText: 'Todas las Fragancias',
        backgroundPosition: 'center',
        topShadow: false
    },
    {
        category: 'Frutales',
        type: 'home',
        prefix: 'Difusor',
        imagePath: '/Fruits.jpg',
        excelRange: "'Hogar'!B3:G5",
        bannerText: 'Fragancias Frutales',
        backgroundPosition: 'center',
        topShadow: true
    }
];

export const textilesSection = [
    {
        category: 'Todos',
        type: 'textile',
        prefix: 'Aromatizante',
        imagePath: '/goldenSilk.jpg',
        bannerText: 'Todas las Fragancias',
        backgroundPosition: 'center',
        topShadow: true
    },
    {
        category: 'Frescura',
        type: 'textile',
        prefix: 'Aromatizante',
        imagePath: '/goldenNatureSilk.jpg',
        excelRange: "'Textil'!B3:G5",
        bannerText: 'Fragancias Frescas',
        backgroundPosition: 'center',
        topShadow: true
    },
    {
        category: 'Frutales',
        type: 'textile',
        prefix: 'Aromatizante',
        imagePath: '/fruitGoldenSilk.jpg',
        excelRange: "'Textil'!B6:G6",
        bannerText: 'Fragancias Frutales',
        backgroundPosition: 'center',
        topShadow: false
    }
];

export const automotiveSection = [
    {
        category: 'Todos',
        type: 'automotive',
        prefix: 'Ambientador',
        imagePath: '/car.jpg',
        excelRange: "'Automotriz'!B3:G5",
        bannerText: 'Fragancia Automotriz',
        backgroundPosition: 'center',
        topShadow: true
    }
];

export const frontLists = [
    {
        category: 'Tendencias',
        excelRange: "'Tendencias'!A4:I8"
    },
    {
        category: 'Novedades',
        excelRange: "'Novedades'!A4:I8"
    }
];