import { actionTypes, TypedAction } from "../../config/types";

const initialState = {
    objects: [] as number[][],
};

const objectsReducer = (state = initialState, action: TypedAction< typeof initialState>): typeof initialState => {
    switch (action.type) {
        case actionTypes.addObjects:
        case actionTypes.moveObjects:
            return {
                ...action.payload
            };
        default:
            return state;
    }
};

export default objectsReducer;
