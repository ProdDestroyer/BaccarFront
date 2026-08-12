import { singlePresentationTypesList } from "../data/constants"

export const isSinglePresentation = (type) => {
    console.log('isSinglePresentation: ', type);
    return !singlePresentationTypesList.includes(type);
}