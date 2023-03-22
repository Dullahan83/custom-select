function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var styled = _interopDefault(require('styled-components'));

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }
  strings.raw = raw;
  return strings;
}

var _templateObject;
var CustomSelect = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n*{\n    margin: 0;\n    padding:0;\n    box-sizing: border-box;\n    scroll-behavior: ", ";\n}\n    box-sizing: border-box;\n    width: ", ";\n    min-width: ", ";\n    position: relative;\n    label{\n        display:flex;\n        margin: ", ";\n        font-size: ", ";\n    }\n    &:hover{\n        cursor:pointer;\n    }\n    .dropdown-btn{\n        width: 100%;\n        display: flex;\n        background-color: ", " ;\n        padding: ", ";\n        border: ", ";\n        font-size: ", ";\n        align-items: center;\n        justify-content: space-between;\n        position: relative;\n        p{\n            text-overflow: ellipsis;\n            white-space: nowrap;\n            overflow: hidden;\n        }\n    }\n    \n    .options{\n        position: absolute;\n        overflow: hidden;\n        z-index: 1000;\n        width: 100%;\n        list-style: none;\n        border: ", ";\n        background-color: ", ";\n        font-size: ", ";\n        font-family: inherit ;\n        padding:0;\n        max-height: ", ";\n        overflow-y: ", ";\n        li:nth-of-type(", "){\n            background-color: ", ";\n            color: ", ";\n\n            &:hover{\n                color: ", ";\n            }\n        }\n        li{\n            overflow: hidden;\n            width: 100%;\n            text-overflow: ellipsis;\n            white-space: nowrap;\n            padding: ", ";\n        }\n        li:active, li:focus{\n            background-color: ", ";\n        }\n    }\n    .closed{\n        display: none;\n\n    }\n    .open{\n        display: block;\n        height: fit-content;\n    }\n    .dropdown-arrow{\n        width: 0;\n        height: 0;\n        margin-left: ", ";\n        border-left: 6px solid transparent;\n        border-right: 6px solid transparent;\n        border-top: 7px solid transparent;\n        border-top-color: ", ";\n        border-top-width: ", ";\n        border-left-width: ", ";\n        border-right-width: ", ";\n    }\n    .dropdown-mask{\n        position: absolute;\n        width: 100%;\n        background-color: transparent;\n        height: 100%;\n        left:0;\n    }\n"])), function (props) {
  return props.style ? props.style.scrollBehavior : "auto";
}, function (props) {
  return props.style ? props.style.width : "100%";
}, function (props) {
  return props.style ? props.style.minWidth : "200px";
}, function (props) {
  return props.style ? props.style.labelMargin : "1rem 0 10px 0";
}, function (props) {
  return props.style ? props.style.labelFontSize : "18px";
}, function (props) {
  return props.style ? props.style.buttonBackground : "#fafafa";
}, function (props) {
  return props.style ? props.style.generalPadding : "8px 16px";
}, function (props) {
  return props.style ? props.style.buttonBorder : "1px solid grey";
}, function (props) {
  return props.style ? props.style.fontSize : "inherit";
}, function (props) {
  return props.style ? props.style.optionsBorder : "1px solid grey";
}, function (props) {
  return props.style ? props.style.optionsBackground : "white";
}, function (props) {
  return props.style ? props.style.fontSize : "inherit";
}, function (props) {
  return props.scrollable === true && props.style ? props.style.optionsMaxHeight : "fit-content";
}, function (props) {
  return props.scrollable === true ? "scroll" : "hidden";
}, function (props) {
  return props.index && props.index;
}, function (props) {
  return props.style ? props.style.optionsItemHoverBgColor : "blue";
}, function (props) {
  return props.style ? props.style.optionsItemHoverTxtColor : "white";
}, function (props) {
  return props.style ? props.style.optionsItemHoverTxtColor : "white";
}, function (props) {
  return props.style ? props.style.generalPadding : "8px 16px";
}, function (props) {
  return props.style ? props.style.optionsItemHoverBgColor : "blue";
}, function (props) {
  return props.style ? "0" : "30px";
}, function (props) {
  return props.style ? props.style.arrowColor : "grey";
}, function (props) {
  return props.style ? props.style.arrowSize + "px" : "7px";
}, function (props) {
  return props.style ? props.style.arrowSize - 1 + "px" : "7px";
}, function (props) {
  return props.style ? props.style.arrowSize - 1 + "px" : "7px";
});
function Select(_ref) {
  var customStyle = _ref.customStyle,
    idName = _ref.idName,
    icon = _ref.icon,
    options = _ref.options,
    label = _ref.label,
    scrollable = _ref.scrollable,
    searchTimer = _ref.searchTimer,
    isReset = _ref.isReset,
    baseOption = _ref.baseOption,
    setValue = _ref.setValue;
  var _useState = React.useState(false),
    isOpen = _useState[0],
    setIsOpen = _useState[1];
  var _useState2 = React.useState(baseOption ? baseOption : options[0].name || options[0]),
    visibleOption = _useState2[0],
    setVisibleOption = _useState2[1];
  var _useState3 = React.useState(1),
    activeDescendant = _useState3[0],
    setActiveDescendant = _useState3[1];
  var _useState4 = React.useState(1),
    prevActive = _useState4[0],
    setPrevActive = _useState4[1];
  var btnRef = React.useRef();
  var timerRef = React.useRef();
  var menuRef = React.useRef();
  var searchArray = [];
  defineSearchMaterial();
  function defineSearchMaterial() {
    options && options.forEach(function (option) {
      searchArray.push(option.name ? option.name : option);
    });
  }
  var handleClickAway = function handleClickAway(e) {
    console.log(e.target.tagName);
    if (e.target.tagName === "HTML" || e.target.parentNode.parentNode.id != idName) {
      e.target.className != "option" && setActiveDescendant(prevActive);
      setIsOpen(false);
    } else if (e.target.parentNode.parentNode.id === idName && e.target.className === "dropdown-mask") {
      !isOpen && setIsOpen(function (prev) {
        return !prev;
      });
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
          setIsOpen(function (prev) {
            return !prev;
          });
        }
        if (isOpen) {
          if (e.code === "ArrowLeft" || e.code === "ArrowUp" || e.key === "ArrowLeft" || e.key === "ArrowUp") {
            e.code === "ArrowUp" && e.preventDefault();
            e.code === "ArrowLeft" && e.preventDefault();
            setActiveDescendant(function (prev) {
              return prev > 1 ? prev - 1 : 1;
            });
            scrollToTarget();
          } else if (e.code === "ArrowRight" | e.code === "ArrowDown" || e.key === "ArrowRight" || e.key === "ArrowDown") {
            e.code === "ArrowDown" && e.preventDefault();
            e.code === "ArrowRight" && e.preventDefault();
            activeDescendant < options.length && setActiveDescendant(function (prev) {
              return prev < options.length + 1 ? prev + 1 : prev;
            });
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
            var key = e.key;
            updateLs(key);
            clearTimeout(timerRef.current);
            search();
          }
        }
        break;
    }
  }
  function scrollToTarget(index) {
    var menuOptions = document.querySelectorAll("#" + idName + " ul li");
    menuOptions[index > 0 ? index - 1 : index <= 0 ? 0 : activeDescendant - 1].scrollIntoViewIfNeeded();
  }
  function search() {
    var string = localStorage.getItem(idName + "Search");
    var index = searchArray.findIndex(function (el) {
      return el.slice(0, string.length).toLowerCase() === string.toLowerCase();
    });
    console.log(index);
    setActiveDescendant(index > 0 ? index + 1 : index === 0 ? 1 : activeDescendant);
    timerRef.current = setTimeout(function () {
      resetSearch();
    }, searchTimer ? searchTimer : 1000);
    scrollToTarget(index > 0 ? index + 1 : index < 0 ? activeDescendant : 1);
  }
  function updateLs(key) {
    var string = localStorage.getItem(idName + "Search");
    string ? string += key : string = key;
    localStorage.setItem(idName + "Search", string);
  }
  function resetSearch() {
    localStorage.removeItem(idName + "Search");
    clearTimeout(timerRef.current);
  }
  function handleClickOnItem(e, key) {
    setVisibleOption(e.target.textContent);
    setIsOpen(false);
    setPrevActive(key);
    setActiveDescendant(key);
    setValue && setValue(e.target.dataset.value);
  }
  React.useEffect(function () {
    setValue && setValue(options[0].abbreviation ? options[0].abbreviation : options[0]);
  }, []);
  React.useEffect(function () {
    isOpen && document.addEventListener("click", handleClickAway);
    return function () {
      return document.removeEventListener('click', handleClickAway);
    };
  }, [isOpen]);
  React.useEffect(function () {
    scrollToTarget(1);
    setVisibleOption(baseOption ? baseOption : options[0].name || options[0]);
    setPrevActive(1);
    setActiveDescendant(1);
    setValue(baseOption ? baseOption : options[0].abbreviation || options[0]);
  }, [isReset]);
  return /*#__PURE__*/React__default.createElement(CustomSelect, {
    id: idName,
    style: customStyle && customStyle,
    index: activeDescendant,
    scrollable: scrollable,
    onKeyDown: function onKeyDown(e) {
      return handleKeyPress(e);
    },
    onMouseOver: function onMouseOver(e) {
      return handleMouseOver(e);
    },
    "data-value": options[activeDescendant - 1].abbreviation || options[activeDescendant - 1]
  }, label && /*#__PURE__*/React__default.createElement("label", {
    htmlFor: idName + "-btn",
    onClick: function onClick() {
      var _btnRef$current;
      return (_btnRef$current = btnRef.current) === null || _btnRef$current === void 0 ? void 0 : _btnRef$current.focus();
    }
  }, label), /*#__PURE__*/React__default.createElement("div", {
    ref: btnRef,
    role: "combobox",
    "aria-controls": idName + "-dropdow-menu",
    "aria-activedescendant": activeDescendant,
    "aria-haspopup": "listbox",
    id: idName + "-btn",
    "aria-expanded": isOpen,
    "aria-owns": idName + "-dropdow-menu",
    className: "dropdown-btn",
    tabIndex: "0"
  }, /*#__PURE__*/React__default.createElement("p", null, visibleOption), icon ? icon : /*#__PURE__*/React__default.createElement("div", {
    className: "dropdown-arrow"
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "dropdown-mask",
    onClick: function onClick() {
      setIsOpen(function (prev) {
        return !prev;
      });
      setActiveDescendant(prevActive);
    }
  })), /*#__PURE__*/React__default.createElement("ul", {
    ref: menuRef,
    id: idName + "-dropdow-menu",
    role: "listbox",
    "aria-hidden": !isOpen,
    className: isOpen ? "options open" : "options closed"
  }, options && options.map(function (option, key) {
    return /*#__PURE__*/React__default.createElement("li", {
      key: key,
      onClick: function onClick(e) {
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

module.exports = Select;
//# sourceMappingURL=index.js.map
