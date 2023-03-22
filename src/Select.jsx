import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'


const CustomSelect = styled.div`
*{
    margin: 0;
    padding:0;
    box-sizing: border-box;
    scroll-behavior: ${props => props.style ? props.style.scrollBehavior : "auto"};
}
    box-sizing: border-box;
    width: ${props => props.style ? props.style.width : "100%"};
    min-width: ${props => props.style ? props.style.minWidth : "200px"};
    position: relative;
    label{
        display:flex;
        margin: ${props => props.style ? props.style.labelMargin : "1rem 0 10px 0"};
        font-size: ${props => props.style ? props.style.labelFontSize : "18px"};
    }
    &:hover{
        cursor:pointer;
    }
    .dropdown-btn{
        width: 100%;
        display: flex;
        background-color: ${props => props.style ? props.style.buttonBackground : "#fafafa"} ;
        padding: ${props => props.style ? props.style.generalPadding : "8px 16px"};
        border: ${props => props.style ? props.style.buttonBorder : "1px solid grey"};
        font-size: ${props => props.style ? props.style.fontSize : "inherit"};
        align-items: center;
        justify-content: space-between;
        position: relative;
        p{
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
    }
    
    .options{
        position: absolute;
        overflow: hidden;
        z-index: 1000;
        width: 100%;
        list-style: none;
        border: ${props => props.style ? props.style.optionsBorder : "1px solid grey"};
        background-color: ${props => props.style ? props.style.optionsBackground : "white"};
        font-size: ${props => props.style ? props.style.fontSize : "inherit"};
        font-family: inherit ;
        padding:0;
        max-height: ${props => props.scrollable === true && props.style ? props.style.optionsMaxHeight : "fit-content"};
        overflow-y: ${props => props.scrollable === true ? "scroll" : "hidden"};
        li:nth-of-type(${props => props.index && props.index}){
            background-color: ${props => props.style ? props.style.optionsItemHoverBgColor : "blue"};
            color: ${props => props.style ? props.style.optionsItemHoverTxtColor : "white"};

            &:hover{
                color: ${props => props.style ? props.style.optionsItemHoverTxtColor : "white"};
            }
        }
        li{
            overflow: hidden;
            width: 100%;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding: ${props => props.style ? props.style.generalPadding : "8px 16px"};
        }
        li:active, li:focus{
            background-color: ${props => props.style ? props.style.optionsItemHoverBgColor : "blue"};
        }
    }
    .closed{
        display: none;

    }
    .open{
        display: block;
        height: fit-content;
    }
    .dropdown-arrow{
        width: 0;
        height: 0;
        margin-left: ${props => props.style ? "0" : "30px"};
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 7px solid transparent;
        border-top-color: ${props => props.style ? props.style.arrowColor : "grey"};
        border-top-width: ${props => props.style ? props.style.arrowSize + "px" : "7px"};
        border-left-width: ${props => props.style ? props.style.arrowSize - 1 + "px" : "7px"};
        border-right-width: ${props => props.style ? props.style.arrowSize - 1 + "px" : "7px"};
    }
    .dropdown-mask{
        position: absolute;
        width: 100%;
        background-color: transparent;
        height: 100%;
        left:0;
    }
`

/**
 * @param {object} customStyle css property in object form : Optionnal
 * @param {string} idName name to be passed as component id : Mandatory, needed to correctly launch events
 * @param {HTMLElement} icon  html element i/img/svg : Optionnal
 * @param {Array} options either plain array or array of object : Mandatory in case of a select Type
 * @param {string} label label field text content : Optionnal
 * @param {boolean} scrollable change menu to a scrollable one : Optionnal
 * @param {number} searchTimer set a specific timer for the reset of search : Optionnal, a base timer of 1500ms is set by default  
 * @param {boolean} isReset props in the form of a boolean to define when comonent should be reset : Optionnal/Mandatory
 * @param {string} baseOption Used as the default option
 * @param {function} setValue setState of the parent component : Mandatory to control output of component
 * 
 * @returns {Select} React component 
 */

function Select({ customStyle, idName, icon, options, label, scrollable, searchTimer, isReset, baseOption, setValue }) {
    const [isOpen, setIsOpen] = useState(false)
    const [visibleOption, setVisibleOption] = useState(baseOption ? baseOption : options[0].name || options[0])
    const [activeDescendant, setActiveDescendant] = useState(1)
    const [prevActive, setPrevActive] = useState(1)
    const btnRef = useRef()
    const timerRef = useRef()
    const menuRef = useRef()
    let searchArray = []
    defineSearchMaterial()

    function defineSearchMaterial() {
        options && options.forEach(option => {
            searchArray.push(option.name ? option.name : option)
        });
    }

    const handleClickAway = (e) => {
        console.log(e.target.tagName)
        if (e.target.tagName === "HTML" || e.target.parentNode.parentNode.id != idName) {
            e.target.className != "option" && setActiveDescendant(prevActive)
            setIsOpen(false)
        }
        else if (e.target.parentNode.parentNode.id === idName && e.target.className === "dropdown-mask") {
            !isOpen && setIsOpen(prev => !prev)
        }
    }

    function handleMouseOver(e) {
        if (e.target.className === "option") {
            e.target.dataset.key && setActiveDescendant(Number(e.target.dataset.key))
        }
    }

    function handleKeyPress(e) {
        switch (e.target.className) {
            case "dropdown-btn":
                if (e.code === "Space" | e.code === "Enter" | e.key === " " | e.key === "Enter") {
                    setIsOpen(prev => !prev)
                }
                if (isOpen) {
                    if (e.code === "ArrowLeft" || e.code === "ArrowUp" || e.key === "ArrowLeft" || e.key === "ArrowUp") {
                        e.code === "ArrowUp" && e.preventDefault()
                        e.code === "ArrowLeft" && e.preventDefault()
                        setActiveDescendant(prev => prev > 1 ? prev - 1 : 1)
                        scrollToTarget()
                    }
                    else if (e.code === "ArrowRight" | e.code === "ArrowDown" || e.key === "ArrowRight" || e.key === "ArrowDown") {
                        e.code === "ArrowDown" && e.preventDefault()
                        e.code === "ArrowRight" && e.preventDefault()
                        activeDescendant < options.length && setActiveDescendant(prev => prev < options.length + 1 ? prev + 1 : prev)
                        scrollToTarget()
                    }
                    else if (e.code === "Space" || e.code === "Enter" || e.key === " " || e.key === "Enter") {
                        e.code === "Space" && e.preventDefault()
                        e.key === " " && e.preventDefault()
                        setPrevActive(activeDescendant)
                        setVisibleOption(options[activeDescendant - 1].name || options[activeDescendant - 1])
                        setIsOpen(false)
                        setValue && setValue(e.target.textContent)
                    }
                    else if (e.code === "Tab" || e.key === "Tab" || e.code === "Escape" || e.key === "Escape") {
                        setActiveDescendant(prevActive)
                        setVisibleOption(options[prevActive - 1].name || options[prevActive - 1])
                        setIsOpen(false)
                    }
                    else if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
                        let key = e.key
                        updateLs(key)
                        clearTimeout(timerRef.current)
                        search()
                    }
                }
                break;
            default:
                break;
        }
    }
    function scrollToTarget(index) {
        const menuOptions = document.querySelectorAll(`#${idName} ul li`)
        menuOptions[index > 0 ? index - 1 : index <= 0 ? 0 : activeDescendant - 1].scrollIntoViewIfNeeded()
    }

    function search() {
        const string = localStorage.getItem(`${idName}Search`)
        const index = searchArray.findIndex(el => el.slice(0, string.length).toLowerCase() === string.toLowerCase())
        console.log(index);
        setActiveDescendant(index > 0 ? index + 1 : index === 0 ? 1 : activeDescendant)

        timerRef.current = setTimeout(() => {
            resetSearch()
        }, searchTimer ? searchTimer : 1000)
        scrollToTarget(index > 0 ? index + 1 : index < 0 ? activeDescendant : 1)
    }
    function updateLs(key) {
        let string = localStorage.getItem(`${idName}Search`)
        string ? string += key : string = key
        localStorage.setItem(`${idName}Search`, string)
    }

    function resetSearch() {
        localStorage.removeItem(`${idName}Search`)
        clearTimeout(timerRef.current)
    }

    function handleClickOnItem(e, key) {
        setVisibleOption((e.target.textContent))
        setIsOpen(false)
        setPrevActive(key)
        setActiveDescendant(key)
        setValue && setValue(e.target.dataset.value)
    }

    useEffect(() => {
        setValue && setValue(options[0].abbreviation ? options[0].abbreviation : options[0])
    }, [])

    useEffect(() => {

        // eslint-disable-next-line no-undef
        isOpen && document.addEventListener("click", handleClickAway)

        // eslint-disable-next-line no-undef
        return () => document.removeEventListener('click', handleClickAway)
    }, [isOpen])

    useEffect(() => {
        scrollToTarget(1)
        setVisibleOption(baseOption ? baseOption : options[0].name || options[0])
        setPrevActive(1)
        setActiveDescendant(1)
        setValue(baseOption ? baseOption : options[0].abbreviation || options[0])
    }, [isReset])
    return (
        <CustomSelect id={idName} style={customStyle && customStyle} index={activeDescendant} scrollable={scrollable} onKeyDown={(e) => handleKeyPress(e)} onMouseOver={(e) => handleMouseOver(e)} data-value={options[activeDescendant - 1].abbreviation || options[activeDescendant - 1]}>
            {label && <label htmlFor={idName + "-btn"} onClick={() => btnRef.current?.focus()}>{label}</label>}
            <div ref={btnRef} role="combobox" aria-controls={`${idName}-dropdown-menu`} aria-activedescendant={activeDescendant} aria-haspopup="listbox" id={`${idName}-btn`} aria-expanded={isOpen} aria-owns={`${idName}-dropdown-menu`} className="dropdown-btn" tabIndex="0" ><p>{visibleOption}</p>{icon ? icon : <div className='dropdown-arrow'></div>}<span className='dropdown-mask' onClick={() => {
                setIsOpen((prev) => !prev)
                setActiveDescendant(prevActive)
            }}></span></div>
            <ul ref={menuRef} id={`${idName}-dropdown-menu`} role="listbox" aria-hidden={!isOpen} className={isOpen ? "options open" : "options closed"}>
                {options && options.map((option, key) => {
                    return <li key={key} onClick={(e) => {
                        handleClickOnItem(e, key + 1)
                    }}
                        data-key={key + 1} data-value={option.abbreviation || option} className="option" role="option" aria-selected={key + 1 === prevActive ? true : false}>{option.name || option}</li>
                })}
            </ul>
        </CustomSelect>
    )
}


export default Select
