import React, { useState } from 'react'
import { states, departments } from './datas'
// import Select from './Select'
import Select from "react-customizable-select"
const style = {
  fontSize: "24px",
  width: "200px",
  minWidth: "300px",
  color: "#000",
  menuMaxHeight: "250px",
  labelMargin: "1rem 0 10px 0",
  labelFontSize: "18px",
  generalPadding: "8px 16px",
  buttonBorder: "1px solid grey",
  buttonBackground: "#ededed",
  optionsBorder: "1px solid grey",
  optionsBackground: "#fff",
  optionsItemHoverBgColor: "blue",
  optionsItemColor: "black",
  optionsItemHoverTxtColor: "white",
  arrowColor: "black",
  arrowSize: 10
}

const style2 = {
  fontSize: "24px",
  labelFontSize: "26px",
  width: "500px",
  minWidth: "500px",
  color: "#000",
  menuMaxHeight: "250px",
  labelMargin: "1rem 0 10px 0",
  labelFontSize: "18px",
  generalPadding: "8px 16px",
  buttonBorder: "1px solid grey",
  buttonBackground: "#ededed",
  optionsBorder: "1px solid grey",
  optionsBackground: "#fff",
  optionsItemHoverBgColor: "red",
  optionsItemColor: "black",
  optionsItemHoverTxtColor: "blue",
  arrowColor: "black",
  arrowSize: 10
}
const App = () => {
  const [state, setState] = useState()

  return <><h1>test</h1><Select idName="test" setValue={setState} options={states} label="States" />
    <br />
    <Select idName="test2" setValue={setState} options={departments} customStyle={style} label="Departments" />
    <br />
    <Select idName="test3" options={states} setValue={setState} customStyle={style2} />
  </>
}

export default App
