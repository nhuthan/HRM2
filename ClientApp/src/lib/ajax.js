import {
    HttpError,
    NetworkError,
    DataError
} from './errors';
var qs = require('qs');

const apiCall = ({
    action,
    dispatch,
    getState
}) => {
    const account = getState().account || {};
    const token = account.token;

    var {
        url,
        json,
        method,
        actions,
        params,
        meta,
        body,
        contentType,
        abortController,
        download
    } = action;

    method = !method ? "GET" : method.toUpperCase();

    if (actions && actions.start) {
        dispatch(actions.start({
            params,
            meta
        }));
    }

    if (!contentType && !body) {
        contentType = json !== false ? 'application/json' : 'application/x-www-form-urlencoded'
    }

    if (params && !body) {
        if (method !== 'GET' && method !== 'DELETE') {
            if (json !== false) {
                body = JSON.stringify(params);
            } else {
                body = qs.stringify(params);
            }
        } else {
            url += '?' + qs.stringify(params, {
                allowDots: true
            })
        }
    }

    const opts = {
        method: method,
        headers: {},
        body: body
    };

    if (contentType) {
        opts.headers['Content-Type'] = contentType;
    }

    if (token) {
        opts.headers['Authorization'] = 'Bearer ' + token;
    }

    if (abortController && abortController.signal) {
        opts.signal = abortController.signal;
    }

    return new Promise(function (resolve, reject) {
        fetch(url, opts)
            .then(res => {
                if (!res.ok) {
                    if (res.status === 401) {
                        console.log('not authenticated...')
                        dispatch({
                            type: 'ACCOUNT_LOGOUT'
                        })
                    }
                    var type = res.headers.get('content-type');
                    if (type && type.match('application/json')) {
                        return res.json()
                            .catch(e => ({}))
                            .then(data => {
                                console.log(data, res);
                                throw new HttpError(data, res)
                            });
                    } else {
                        return res.text()
                            .catch(e => null)
                            .then(data => {
                                console.log(data, res);
                                throw new HttpError({
                                    message: data
                                }, res)
                            });
                    }
                }
                if (download) {
                    const filename = res.headers.get('Content-Disposition')
                        .match(/filename=([^;]+);/)[1];

                    res.blob().then(data => {
                        const href = window.URL.createObjectURL(data);
                        const link = document.createElement('a');
                        link.href = href;
                        link.download = filename;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    })
                    return;
                }
                return res.json();
            })
            .then(data => {
                return onSuccess(data, resolve, reject);
            })
            .catch(error => {
                return onError(error, reject);
            })
    });

    function onError(error, reject) {
        error = (error instanceof HttpError || error instanceof DataError) ? error : new NetworkError(error, url);

        var noConnection = (error instanceof NetworkError) || error.status >= 500;

        if (actions && actions.error) {
            dispatch(actions.error({
                params,
                meta,
                url,
                error,
                noConnection
            }));
        }

        if (reject) {
            return reject(error);
        } else {
            return Promise.reject(error);
        }
    }

    function onSuccess(data, resolve, reject) {
        if (data && data.error) {
            return onError(new DataError(data), reject);
        }
        if (actions && actions.success) {
            dispatch(actions.success({
                params,
                data,
                meta
            }));
        }
        return resolve(data);
    }
};

const ajaxMiddleware = ({
    dispatch,
    getState
}) => {
    return next => {
        return action => {
            if (typeof action === 'object' && action.url && !action.type) {
                return apiCall({
                    action,
                    dispatch,
                    getState
                });
            }
            return next(action);
        }
    }
};

export default ajaxMiddleware;