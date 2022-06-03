import { actions } from '../reducer/app';
console.log('app actions', actions)

export const getEnums = () => {
    return {
        url: '/api/enums',
        types: {
            success: actions.setEnums,
        }
    };
};