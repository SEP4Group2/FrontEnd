import React from "react";
import "./Icons.css";
import Image1 from "../../assets/icons/1.jpg";
import Image2 from "../../assets/icons/2.jpg";
import Image3 from "../../assets/icons/3.jpg";
import Image4 from "../../assets/icons/4.jpg";
import Image5 from "../../assets/icons/5.jpg";
import Image6 from "../../assets/icons/6.jpg";
import Image7 from "../../assets/icons/7.jpg";
import Image8 from "../../assets/icons/8.jpg";
import Image9 from "../../assets/icons/9.jpg";
import Image10 from "../../assets/icons/10.jpg";
import Image11 from "../../assets/icons/11.jpg";
import Image12 from "../../assets/icons/12.jpg";
import Image13 from "../../assets/icons/13.jpg";


const Icons = ({setIconId, updateIconId, setMainIconSrc}) => {

  const handleClick = (id) =>{
    setIconId(id);
  }

  return (
    <div className="icons-container">
      <div className="icons">
        <img className="imgs" src={Image1} alt={" "} onClick={handleClick(1)}/>
        <img className="imgs" src={Image2} alt={" "} onClick={handleClick(2)}/>
        <img className="imgs" src={Image3} alt={" "} onClick={handleClick(3)}/>
        <img className="imgs" src={Image4} alt={" "} onClick={handleClick(4)}/>
        <img className="imgs" src={Image5} alt={" "} onClick={handleClick(5)}/>
        <img className="imgs" src={Image6} alt={" "} onClick={handleClick(6)}/>
        <img className="imgs" src={Image7} alt={" "} onClick={handleClick(7)}/>
        <img className="imgs" src={Image8} alt={" "} onClick={handleClick(8)}/>
        <img className="imgs" src={Image9} alt={" "} onClick={handleClick(9)}/>
        <img className="imgs" src={Image10} alt={" "} onClick={handleClick(10)}/>
        <img className="imgs" src={Image11} alt={" "} onClick={handleClick(11)}/>
        <img className="imgs" src={Image12} alt={" "} onClick={handleClick(12)}/>
        <img className="imgs" src={Image13} alt={" "} onClick={handleClick(13)}/>
      </div>
    </div>
  );
};

export default Icons;
