const bodilySection = [
    { name: 'Todos', imagePath: '/goldenCouple2.jpg', bannerText: 'Todos los Perfumes', backgroundPosition: 'center' },
    { name: 'Mujer', imagePath: '/goldenFemaleModel.jpg', excelRange: "'Esencias y Sensaciones'!B7:H103", bannerText: 'Perfumes Para Mujer', backgroundPosition: 'center' },
    { name: 'Hombre', imagePath: '/goldenMaleModel.jpg', excelRange: "'Esencias y Sensaciones'!B107:H201", bannerText: 'Perfumes Para Hombre', backgroundPosition: 'center' },
    { name: 'Unisex', imagePath: '/goldenCouple.jpg', excelRange: "'Esencias y Sensaciones'!B205:H218", bannerText: 'Perfumes Unisex', backgroundPosition: 'center' },];

const homeSection = [
    { name: 'Todos', imagePath: '/Home.jpg', bannerText: 'Todas las Fragancias', backgroundPosition: 'center' },
    { name: 'Frutales', imagePath: '/Fruits.jpg', excelRange: "'Hogar'!B3:F5", bannerText: 'Fragancias Frutales', backgroundPosition: 'center' }]

export default {
    bodilySection,
    homeSection
}
