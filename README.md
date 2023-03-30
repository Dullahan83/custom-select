# react-customizable-select

> A Simple Customizable React Select Component

[![NPM](https://img.shields.io/npm/v/react-customizable-select.svg)](https://www.npmjs.com/package/react-customizable-select) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-customizable-select
```

## Usage

```jsx
import React, { Component } from 'react'

import MyComponent from 'react-customizable-select'
import 'react-customizable-select/dist/index.css'

class Example extends Component {
  render() {
    return <MyComponent />
  }
}
```

## Necessary Props

**options:** _string[] | object[{abbreviation: string, name: string}]_  
**idName:** _string_  
**setValue:** _(val: string) => void_  

## Optionnal Props

**customStyle:**

```jsx
const style = {
  fontSize: '24px',
  width: '200px',
  minWidth: '300px',
  color: '#000',
  menuMaxHeight: '250px',
  scrollBehavior: 'smooth',
  labelMargin: '1rem 0 10px 0',
  generalPadding: '8px 16px',
  buttonBorder: '1px solid grey',
  buttonBackground: '#ededed',
  optionsBorder: '1px solid grey',
  optionsBackground: '#fff',
  optionsItemHoverBgColor: 'blue',
  optionsItemColor: 'black',
  optionsItemHoverTxtColor: 'white',
  arrowColor: 'black',
  arrowSize: 10
}
```

**icon:**

```jsx
  <i></i>
  or
  <img></img>
  or
  <svg></svg>
```

**label:** _string_  
**scrollable:** _boolean_  
**searchTimer:** _number in ms_  
**isReset:** _boolean (used to reset component to initial state)_  
**baseOption:** _string (used to define the default appearing option)_  

## License

MIT © [Dullahan83](https://github.com/Dullahan83)
