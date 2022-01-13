import { actionTypes, TypedAction } from "../../config/types";

const initialState = [] as number[][];

const groundReducer = (state = initialState, action: TypedAction< typeof initialState>): typeof initialState => {
    switch (action.type) {
        case actionTypes.addGround:
        case actionTypes.updateGround:
            return action.payload;
        default:
            return state;
    }
};

export default groundReducer;
