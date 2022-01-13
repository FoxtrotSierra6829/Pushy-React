import { combineReducers, createStore } from 'redux';
import pushyReducer from '../actor/pushy/reducer';
import beanReducer from '../actor/pushy/reducer.bean';
import groundReducer from '../world/ground/reducer';
import objectsReducer from '../world/objects/reducer';
import levelnameReducer from '../world/levelname/reducer';

const rootReducer = combineReducers({
    pushy: pushyReducer,
    ground: groundReducer,
    objects: objectsReducer,
    levelName: levelnameReducer,
    bean: beanReducer,
});

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(
    rootReducer,
    composeEnhancers,
);

export type RootState = ReturnType<typeof store.getState>

export default store;
