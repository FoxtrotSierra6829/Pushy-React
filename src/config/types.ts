export const actionTypes = {
    addGround: 'ADD_GROUND',
    addLevelName: 'ADD_LEVELNAME',
    addObjects: 'ADD_OBJECTS',
    moveObjects: 'MOVE_OBJECTS',
    movePushy: 'MOVE_PUSHY',
    updateBeanCount: 'UPDATE_BEAN_COUNT',
    updateGround: 'UPDATE_GROUND',
};

export type TypedAction<T> = { type: string, payload: T };

export type levelType = {
    levelName: string,
    ground: number[][],
    objects: number[][],
    initalPushyPosition: number[]

}
