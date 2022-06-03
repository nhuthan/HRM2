import React from 'react';
import { Spin } from 'antd';

export default class Splash extends React.Component {
    render() {
        return (
            <div className='fixed w-screen h-screen'>
                <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
                    <Spin size="large" />
                </div>
            </div>
        )
    }
}