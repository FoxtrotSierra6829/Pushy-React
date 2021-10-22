import { actionTypes } from "../config/types"

const initialState = {
    level: 1
}

const worldReducer = (state=initialState, action: any) => {
    switch(action.type) {
        case actionTypes.changeLevel:
            return {
                ...action.payload
            }
        default:
        return state
    }
}


export default worldReducer