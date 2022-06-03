import React from 'react';

export default class NotFoundPage extends React.Component {
    render() {
        return (
            <section className="error">
                <div className="error__inner">
                    <h1>404</h1>
                    <h2>Page not found!</h2>
                </div>
            </section>
        );
    }
}