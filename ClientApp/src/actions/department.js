import { actions } from '../reducer/department';

export const getList = () => {
    return {
        url: '/api/departments',
        actions: {
            success: actions.setItems,
        }
    };
};