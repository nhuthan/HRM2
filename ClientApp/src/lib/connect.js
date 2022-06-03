
import React from 'react';
import User from './user';
import { connect as rdConnect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

export const AppContext = React.createContext({
    user: {},
    options: {},
    redirect: null,
});

export const ContextProvider = ({ children, history }) => {

    const account = useSelector(state => state.account);
    const options = useSelector(state => state.options);

    const redirect = (to, push) => {
        if (typeof to == 'string') {
            to = {
                pathname: to,
            };
        }

        to = {
            state: null,
            search: '',
            ...to
        }

        if (push) {
            history.push(to.pathname + to.search, to.state);
        }
        else {
            history.replace(to.pathname + to.search, to.state);
        }
    }

    const contextValue = {
        user: new User(account),
        options,
        redirect
    };

    return <AppContext.Provider value={contextValue}>
        {children}
    </AppContext.Provider>
}

export const connect = (component, mapStateToProp, actions, mapDispatchToProps) => {
    if (!component) {
        throw new Error("Component can not be null");
    }

    if (component.prototype.render) {
        component.contextType = AppContext;
    }

    component.prototype.redirect = function (to, push) {
        if (this.context.redirect) {
            this.context.redirect(to, push);
        }
    }

    const make = actions ?
        rdConnect(mapStateToProp, dispatch => {
            if (typeof mapDispatchToProps == 'function') {
                return {
                    actions: bindActionCreators(actions, dispatch),
                    ...mapDispatchToProps(dispatch)
                }
            }
            else {
                return {
                    actions: bindActionCreators(actions, dispatch)
                }
            }
        }, null, { forwardRef: true })
        : rdConnect(mapStateToProp, mapDispatchToProps, null, { forwardRef: true });

    return make(component);
}
export default connect;
