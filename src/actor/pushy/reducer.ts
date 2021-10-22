
import { actionTypes, PushyAction, PushyState } from "../../config/types"

const initialState = {
    position: [5,7],
    rotation: 0,
}

const pushyReducer = (state=initialState, action: PushyAction): PushyState => {
    switch(action.type) {
        case actionTypes.movePushy:
            return {
                ...action.payload
            }
        default:
            return state
    }
};


export default pushyReducer