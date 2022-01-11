import { actionTypes, WorldAction, WorldState } from "../config/types";

const initialState = {
    level: 1,
    maxlevel: 1
};

const worldReducer = (state = initialState, action: WorldAction): WorldState => {
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
