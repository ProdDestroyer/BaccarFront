//Lines
const bodilySection = [
    { name: 'Todos', imagePath: '/goldenCouple2.jpg', bannerText: 'Todos los Perfumes', backgroundPosition: 'center', topShadow: false },
    { name: 'Mujer', imagePath: '/goldenFemaleModel.jpg', excelRange: "'Esencias y Sensaciones'!B7:H103", bannerText: 'Perfumes Para Mujer', backgroundPosition: 'center', topShadow: false },
    { name: 'Hombre', imagePath: '/goldenMaleModel.jpg', excelRange: "'Esencias y Sensaciones'!B107:H201", bannerText: 'Perfumes Para Hombre', backgroundPosition: 'center', topShadow: false },
    { name: 'Unisex', imagePath: '/goldenCouple.jpg', excelRange: "'Esencias y Sensaciones'!B205:H218", bannerText: 'Perfumes Unisex', backgroundPosition: 'center', topShadow: false },];

const homeSection = [
    { name: 'Todos', imagePath: '/Home.jpg', bannerText: 'Todas las Fragancias', backgroundPosition: 'center', topShadow: false },
    { name: 'Frutales', imagePath: '/Fruits.jpg', excelRange: "'Hogar'!B3:F5", bannerText: 'Fragancias Frutales', backgroundPosition: 'center', topShadow: true }];

const textilesSection = [
    { name: 'Todos', imagePath: '/goldenSilk.jpg', bannerText: 'Todas las Fragancias', backgroundPosition: 'center', topShadow: true },
    { name: 'Frescura', imagePath: '/goldenNatureSilk.jpg', excelRange: "'Textil'!B3:F5", bannerText: 'Fragancias Frescas', backgroundPosition: 'center', topShadow: true },
    { name: 'Frutales', imagePath: '/fruitGoldenSilk.jpg', excelRange: "'Textil'!B6:F6", bannerText: 'Fragancias Frutales', backgroundPosition: 'center', topShadow: false }];

const automotiveSection = [
    { name: 'Todos', imagePath: '/car.jpg', excelRange: "'Automotriz'!B3:F5", bannerText: 'Fragancia Automotriz', backgroundPosition: 'center', topShadow: true }];

//FrontPageRelatedData
const frontLists = [
    { title: 'Tendencias', excelRange: "'Tendencias'!B4:H8", },
    { title: 'Novedades', excelRange: "'Novedades'!B4:H8", }];

export default {
    bodilySection,
    homeSection,
    textilesSection,
    automotiveSection,
    frontLists,
}
