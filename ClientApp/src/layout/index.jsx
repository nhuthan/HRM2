import React from "react";
import { Navigate } from "react-router-dom";
import * as accountActions from "../actions/account";
import * as appActions from "../actions/app";
import { connect, ContextProvider } from "../lib/connect";
import { Layout } from 'antd';
import ErrorPage from "./error";
import Header from "./header";
import NotFoundPage from "./notfound";
import SplashPage from "./splash";

const { Content } = Layout;

class LayoutPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: props.account.loaded,
            networkError: null
        };
    }

    componentDidMount() {
        this.props.actions.getEnums();
        this.props.actions.checkToken();
    }

    componentDidUpdate() {
        if (
            this.props.account.token &&
            !this.props.account.loggedIn
        ) {
            if (!this.loadingAccount) {
                this.loadingAccount = true;
                this.props.actions
                    .getProfile()
                    .then(() => {
                        this.loadingAccount = false;
                    })
                    .catch((error) => {
                        if (error.status === 401 || error.status === 400) {
                            this.props.actions.logout();
                        } else {
                            this.setState({ networkError: error });
                        }
                        this.loadingAccount = false;
                    });
            }
        }
    }

    render() {
        if (this.state.networkError) {
            return <ErrorPage {...this.state.networkError} error="500" />;
        }

        const account = this.props.account;

        if (!account.tokenChecked || account.token && !account.loggedIn) {
            return <SplashPage />;
        }

        const { location } = this.props;

        if (!account.loggedIn) {
            return (
                <Navigate
                    to='/login'
                    state={{
                        from: location?.pathname,
                        search: location?.search,
                    }}
                />
            );
        }

        return this.props.children;
    }
}

const LayoutWrap = connect(
    LayoutPage,
    (state) => ({
        account: state.account,
        app: state.app,
    }),
    { ...accountActions, ...appActions }
);

const LayoutWithContext = (props) => (
    <ContextProvider {...props}>
        <LayoutWrap {...props} />
    </ContextProvider>
);

export default LayoutWithContext;