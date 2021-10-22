import { actionTypes } from "../../config/types"

const initialState = {
    objects: [],
}

const objectsReducer = (state=initialState, action: any) => {
    switch(action.type) {
        case actionTypes.addObjects:
        case actionTypes.moveObjects:
            return {
                ...action.payload
            }
        default:
        return state
    }
}


export default objectsReducer