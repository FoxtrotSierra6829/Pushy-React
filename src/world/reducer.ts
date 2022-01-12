import { actionTypes, TypedAction } from "../config/types";

const initialState = {
    level: 1,
    maxlevel: 1
};

const worldReducer = (state = initialState, action: TypedAction< typeof initialState>): typeof initialState => {
    switch (action.type) {
        case actionTypes.changeLevel:
            return {
                ...action.payload
            };
        default:
            return state;
    }
};

export default worldReducer;
