import React from 'react';
import { Link } from 'react-router-dom';

export default class ErrorPage extends React.Component {
    render() {
        return (
            <section style={this.props.inner ? { height: 'auto' } : null}>
                <div>
                    <h1>{this.props.error}</h1>
                    <h2>{this.props.message}</h2>
                    <br />
                    <Link to="/">Back to home</Link> | <Link to="/logout">Log out</Link>
                </div>
            </section>
        );
    }
}