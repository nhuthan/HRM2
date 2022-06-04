import { actions } from '../reducer/app';

export const getEnums = () => {
    return {
        url: '/api/enums',
        actions: {
            success: actions.setEnums,
        }
    };
};