import { actions } from '../reducer/account';

export const getProfile = () => {
    return {
        url: '/account',
        method: 'get',
        types: {
            success: actions.setProfile
        }
    };
};

export const login = (username, password, remember) => {
    return {
        url: '/account/login',
        method: 'post',
        params: {
            username,
            password,
            remember
        },
        types: {
            success: actions.setToken,
        }
    }
}

export const logout = () => {
    return {
        type: 'account/logout'
    }
}

export const checkToken = () => {
    return {
        type: 'account/checkToken'
    }
}

export const getExportToken = () => {
    return {
        url: '/account/getExportToken',
    }
}

export const updateAvatar = (url) => {
    return {
        url: '/account/avatar/',
        method: 'patch',
        params: {
            url
        },
        types: {
            success: actions.setProfile
        }
    };
};


export const updateProfile = (data) => {
    return {
        url: '/account',
        method: 'put',
        params: {
            ...data
        },
        types: {
            success: actions.setProfile
        }
    }
}

export const changePassword = (data) => {
    return {
        url: '/account/password',
        method: 'post',
        params: {
            ...data
        }
    }
}

export const resetPassword = (email, code, newPassword) => {
    return {
        url: '/account/resetPassword',
        method: 'post',
        params: {
            email,
            code,
            newPassword
        }
    }
}