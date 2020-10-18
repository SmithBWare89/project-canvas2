import React, { useState, useEffect } from 'react';
import { Menu, Segment, Transition } from 'semantic-ui-react';
import '../../App.css'

export default function Nav(props) {
    const {
        navLinks,
        setCurrentLink,
        currentLink,
        contactSelected,
        setContactSelected
    } = props;

    const styleOptions = {
        backgroundColor: '#001427',
        color: '#f7f7ff',
        textAlign: 'center'
    };

    const transitions = [
        'jiggle',
        'flash',
        'shake',
        'pulse',
        'tada',
        'bounce'
    ];

    const [menuState, setMenuState] = useState('Home');
    function handleMenuClick(e, { name }) {
        setMenuState(name);
        setContactSelected(false);
    }

    const [animationState, setAnimationState] = useState({
        animation: transitions[0],
        duration: 700
    });

    const handleAnimation = () => {
        setAnimationState(
            {
                visible: false
            }
        )
    }

    useEffect(() => {
        const transitionSelected = Math.floor(Math.random() * 7)
        setAnimationState({
            animation: transitions[transitionSelected],
            duration: 700,
            visible: true
        })
    },[animationState.visible])

    useEffect(() => {
        document.title = `${currentLink}`
    }, [currentLink])

    return (
    <Segment 
        inverted
        style={styleOptions}
    >
        <Menu 
            inverted 
            pointing 
            secondary
        >
            {/* Animated Name/Banner */}
            <Menu.Item 
                name='myName'
            >
                <Transition
                    animation={animationState.animation}
                    duration={animationState.duration}
                    visible={animationState.visible}
                >
                    <span onClick={handleAnimation}>Stephon Smith</span>
                </Transition>
            </Menu.Item>
            {/* Map over nav link names and create them */}
            {navLinks.map((link) => {
                const {name} = link
                return <Menu.Item
                    name={name}
                    active={menuState === name}
                    onClick={handleMenuClick}
                    className={
                        name === 'Contact'
                            ? `${currentLink === name && setContactSelected(true) && 'navActive'}`
                            : `${currentLink === name && !contactSelected && 'navActive'}`
                    }
                    key={link.name}
                 >
                    <span
                        onClick={() => {
                            setCurrentLink(link.name);
                        }}
                    >
                        {link.name}
                    </span>
                </Menu.Item>
            })}
        </Menu>
    </Segment>
    )
}