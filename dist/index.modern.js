import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

let _ = t => t,
  _t;
const CustomSelect = styled.div(_t || (_t = _`
*{
    margin: 0;
    padding:0;
    box-sizing: border-box;
    scroll-behavior: ${0};
}
    box-sizing: border-box;
    width: ${0};
    min-width: ${0};
    position: relative;
    label{
        display:flex;
        margin: ${0};
        font-size: ${0};
    }
    &:hover{
        cursor:pointer;
    }
    .dropdown-btn{
        width: 100%;
        display: flex;
        background-color: ${0} ;
        padding: ${0};
        border: ${0};
        font-size: ${0};
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
        border: ${0};
        background-color: ${0};
        font-size: ${0};
        font-family: inherit ;
        padding:0;
        max-height: ${0};
        overflow-y: ${0};
        li:nth-of-type(${0}){
            background-color: ${0};
            color: ${0};

            &:hover{
                color: ${0};
            }
        }
        li{
            overflow: hidden;
            width: 100%;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding: ${0};
        }
        li:active, li:focus{
            background-color: ${0};
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
        margin-left: ${0};
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 7px solid transparent;
        border-top-color: ${0};
        border-top-width: ${0};
        border-left-width: ${0};
        border-right-width: ${0};
    }
    .dropdown-mask{
        position: absolute;
        width: 100%;
        background-color: transparent;
        height: 100%;
        left:0;
    }
`), props => props.style ? props.style.scrollBehavior : "auto", props => props.style ? props.style.width : "100%", props => props.style ? props.style.minWidth : "200px", props => props.style ? props.style.labelMargin : "1rem 0 10px 0", props => props.style ? props.style.labelFontSize : "18px", props => props.style ? props.style.buttonBackground : "#fafafa", props => props.style ? props.style.generalPadding : "8px 16px", props => props.style ? props.style.buttonBorder : "1px solid grey", props => props.style ? props.style.fontSize : "inherit", props => props.style ? props.style.optionsBorder : "1px solid grey", props => props.style ? props.style.optionsBackground : "white", props => props.style ? props.style.fontSize : "inherit", props => props.scrollable === true && props.style ? props.style.optionsMaxHeight : "fit-content", props => props.scrollable === true ? "scroll" : "hidden", props => props.index && props.index, props => props.style ? props.style.optionsItemHoverBgColor : "blue", props => props.style ? props.style.optionsItemHoverTxtColor : "white", props => props.style ? props.style.optionsItemHoverTxtColor : "white", props => props.style ? props.style.generalPadding : "8px 16px", props => props.style ? props.style.optionsItemHoverBgColor : "blue", props => props.style ? "0" : "30px", props => props.style ? props.style.arrowColor : "grey", props => props.style ? props.style.arrowSize + "px" : "7px", props => props.style ? props.style.arrowSize - 1 + "px" : "7px", props => props.style ? props.style.arrowSize - 1 + "px" : "7px");
function Select({
  customStyle,
  idName,
  icon,
  options,
  label,
  scrollable,
  searchTimer,
  isReset,
  baseOption,
  setValue
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleOption, setVisibleOption] = useState(baseOption ? baseOption : options[0].name || options[0]);
  const [activeDescendant, setActiveDescendant] = useState(1);
  const [prevActive, setPrevActive] = useState(1);
  const btnRef = useRef();
  const timerRef = useRef();
  const menuRef = useRef();
  let searchArray = [];
  defineSearchMaterial();
  function defineSearchMaterial() {
    options && options.forEach(option => {
      searchArray.push(option.name ? option.name : option);
    });
  }
  const handleClickAway = e => {
    console.log(e.target.tagName);
    if (e.target.tagName === "HTML" || e.target.parentNode.parentNode.id != idName) {
      e.target.className != "option" && setActiveDescendant(prevActive);
      setIsOpen(false);
    } else if (e.target.parentNode.parentNode.id === idName && e.target.className === "dropdown-mask") {
      !isOpen && setIsOpen(prev => !prev);
    }
  };
  function handleMouseOver(e) {
    if (e.target.className === "option") {
      e.target.dataset.key && setActiveDescendant(Number(e.target.dataset.key));
    }
  }
  function handleKeyPress(e) {
    switch (e.target.className) {
      case "dropdown-btn":
        if (e.code === "Space" | e.code === "Enter" | e.key === " " | e.key === "Enter") {
          setIsOpen(prev => !prev);
        }
        if (isOpen) {
          if (e.code === "ArrowLeft" || e.code === "ArrowUp" || e.key === "ArrowLeft" || e.key === "ArrowUp") {
            e.code === "ArrowUp" && e.preventDefault();
            e.code === "ArrowLeft" && e.preventDefault();
            setActiveDescendant(prev => prev > 1 ? prev - 1 : 1);
            scrollToTarget();
          } else if (e.code === "ArrowRight" | e.code === "ArrowDown" || e.key === "ArrowRight" || e.key === "ArrowDown") {
            e.code === "ArrowDown" && e.preventDefault();
            e.code === "ArrowRight" && e.preventDefault();
            activeDescendant < options.length && setActiveDescendant(prev => prev < options.length + 1 ? prev + 1 : prev);
            scrollToTarget();
          } else if (e.code === "Space" || e.code === "Enter" || e.key === " " || e.key === "Enter") {
            e.code === "Space" && e.preventDefault();
            e.key === " " && e.preventDefault();
            setPrevActive(activeDescendant);
            setVisibleOption(options[activeDescendant - 1].name || options[activeDescendant - 1]);
            setIsOpen(false);
            setValue && setValue(e.target.textContent);
          } else if (e.code === "Tab" || e.key === "Tab" || e.code === "Escape" || e.key === "Escape") {
            setActiveDescendant(prevActive);
            setVisibleOption(options[prevActive - 1].name || options[prevActive - 1]);
            setIsOpen(false);
          } else if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
            let key = e.key;
            updateLs(key);
            clearTimeout(timerRef.current);
            search();
          }
        }
        break;
    }
  }
  function scrollToTarget(index) {
    const menuOptions = document.querySelectorAll(`#${idName} ul li`);
    menuOptions[index > 0 ? index - 1 : index <= 0 ? 0 : activeDescendant - 1].scrollIntoViewIfNeeded();
  }
  function search() {
    const string = localStorage.getItem(`${idName}Search`);
    const index = searchArray.findIndex(el => el.slice(0, string.length).toLowerCase() === string.toLowerCase());
    console.log(index);
    setActiveDescendant(index > 0 ? index + 1 : index === 0 ? 1 : activeDescendant);
    timerRef.current = setTimeout(() => {
      resetSearch();
    }, searchTimer ? searchTimer : 1000);
    scrollToTarget(index > 0 ? index + 1 : index < 0 ? activeDescendant : 1);
  }
  function updateLs(key) {
    let string = localStorage.getItem(`${idName}Search`);
    string ? string += key : string = key;
    localStorage.setItem(`${idName}Search`, string);
  }
  function resetSearch() {
    localStorage.removeItem(`${idName}Search`);
    clearTimeout(timerRef.current);
  }
  function handleClickOnItem(e, key) {
    setVisibleOption(e.target.textContent);
    setIsOpen(false);
    setPrevActive(key);
    setActiveDescendant(key);
    setValue && setValue(e.target.dataset.value);
  }
  useEffect(() => {
    setValue && setValue(options[0].abbreviation ? options[0].abbreviation : options[0]);
  }, []);
  useEffect(() => {
    isOpen && document.addEventListener("click", handleClickAway);
    return () => document.removeEventListener('click', handleClickAway);
  }, [isOpen]);
  useEffect(() => {
    scrollToTarget(1);
    setVisibleOption(baseOption ? baseOption : options[0].name || options[0]);
    setPrevActive(1);
    setActiveDescendant(1);
    setValue(baseOption ? baseOption : options[0].abbreviation || options[0]);
  }, [isReset]);
  return /*#__PURE__*/React.createElement(CustomSelect, {
    id: idName,
    style: customStyle && customStyle,
    index: activeDescendant,
    scrollable: scrollable,
    onKeyDown: e => handleKeyPress(e),
    onMouseOver: e => handleMouseOver(e),
    "data-value": options[activeDescendant - 1].abbreviation || options[activeDescendant - 1]
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: idName + "-btn",
    onClick: () => {
      var _btnRef$current;
      return (_btnRef$current = btnRef.current) === null || _btnRef$current === void 0 ? void 0 : _btnRef$current.focus();
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    ref: btnRef,
    role: "combobox",
    "aria-controls": `${idName}-dropdow-menu`,
    "aria-activedescendant": activeDescendant,
    "aria-haspopup": "listbox",
    id: `${idName}-btn`,
    "aria-expanded": isOpen,
    "aria-owns": `${idName}-dropdow-menu`,
    className: "dropdown-btn",
    tabIndex: "0"
  }, /*#__PURE__*/React.createElement("p", null, visibleOption), icon ? icon : /*#__PURE__*/React.createElement("div", {
    className: "dropdown-arrow"
  }), /*#__PURE__*/React.createElement("span", {
    className: "dropdown-mask",
    onClick: () => {
      setIsOpen(prev => !prev);
      setActiveDescendant(prevActive);
    }
  })), /*#__PURE__*/React.createElement("ul", {
    ref: menuRef,
    id: `${idName}-dropdow-menu`,
    role: "listbox",
    "aria-hidden": !isOpen,
    className: isOpen ? "options open" : "options closed"
  }, options && options.map((option, key) => {
    return /*#__PURE__*/React.createElement("li", {
      key: key,
      onClick: e => {
        handleClickOnItem(e, key + 1);
      },
      "data-key": key + 1,
      "data-value": option.abbreviation || option,
      className: "option",
      role: "option",
      "aria-selected": key + 1 === prevActive ? true : false
    }, option.name || option);
  })));
}

export default Select;
//# sourceMappingURL=index.modern.js.map
