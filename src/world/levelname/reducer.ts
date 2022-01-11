import { actionTypes, TypedAction } from "../../config/types";

const initialState = {
    levelname: ""
};

const levelnameReducer = (state = initialState, action: TypedAction< typeof initialState>): typeof initialState => {
    switch (action.type) {
        case actionTypes.addLevelName:
            return {
                ...action.payload
            };
        default:
            return state;
    }
};

export default levelnameReducer;
