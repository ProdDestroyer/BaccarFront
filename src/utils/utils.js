import { singlePresentationTypesList } from "../data/constants"

export const isSinglePresentation = (type) => {
    return !singlePresentationTypesList.includes(type);
}