import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { AppContext } from "../lib/connect";
import { Layout, Row, Col, Menu } from 'antd';

const { Header } = Layout;


const menuDropdown = [
    {
        name: "Profile",
        path: "/profile",
    },
    {
        name: "Change Password",
        path: "/profile/change-password",
    },
    {
        divider: true
    },
    {
        name: "Logout",
        path: "/logout",
    },
];

const MyHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user } = useContext(AppContext);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const onDocumentClick = (e) => {
        let menu = document.querySelector('.header-menu');
        if (!menu.contains(e.target)) {
            setMenuOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', onDocumentClick);
        return () => {
            document.removeEventListener('click', onDocumentClick);
        }
    }, [])

    return (
        <Header >
            <Row justify='space-between'>
                <Col flex='none'>
                    <Link to="/">
                        LOGO
                    </Link>
                </Col>
                <Col flex='none' >
                    <Menu mode="inline" className='header-menu' openKeys={menuOpen ? ['menu-x'] : []}>
                        <Menu.SubMenu title={<span>Hello <b>{user.fullName}</b></span>} key='menu-x' onTitleClick={toggleMenu}>
                            {menuDropdown.filter(x => user.isInRole(x.role) || !x.role).map((item, index) => {
                                return item.divider ? (
                                    <Menu.Divider key={index} />
                                ) : (
                                    <Menu.Item key={index}                                        >
                                        <Link to={item.path}>{item.name}</Link>
                                    </Menu.Item>
                                );
                            })}
                        </Menu.SubMenu>
                    </Menu>
                </Col>
            </Row>
        </Header>
    )
}

export default MyHeader;
