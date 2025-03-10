
import { useState } from "react";
import myCss from "./css/Study.module.css"

//classnames를 import해서 cn이라는 이름으로 사용하기
//import cn from "classnames"
//외부 css를 바인딩해서 사용하게 도와주는 binder import
import binder from "classnames/bind"
//binder를 이용해서 myCss를 바인딩해서 cx라는 이름의 함수로 사용하기
const cx = binder.bind(myCss)

function Game(props) {

    const [array, setArray] = useState(["my-color", "bg-yellow"]);
    const [isYellow, setYellow]=useState(false);
    const [style, setStyle] = useState({
        "my-color":false,
        "bg-yellow":false
    });

    const handleChange= (e)=>{
        //변화된 checkbox의 name 속성과 체크여부 얻어내기
        //오브젝트의 구조분해할당.. const name = e.target.name / const checked = e.target.checked;
        const {name, checked}= e.target;
        setStyle({
            ...style,
            [name]:checked
        })
    }

    return (
        <div>
            <h2 className={cx("my-color")}>Game입니다.</h2>
            <p className={cx("my-color", "bg-yellow")}>p1</p>
            <p className={cx(["my-color", "bg-yellow"])}>p2</p>
            <p className={cx(array)}>p3</p>
            <p className={cx({"my-color":true, "bg-yellow":true})}>p4</p>
            bg-yellow <input type="checkbox" onChange={(e)=>{
                //현재 checkbox의 체크 상태를 isYellow에 반영한다.
                setYellow(e.target.checked);
            }}/>
            <p className={cx({"bg-yellow":isYellow})}>p4</p>
            my-color <input type="checkbox" name="my-color" onChange={handleChange}/>
            bg-yellow <input type="checkbox" name="bg-yellow" onChange={handleChange}/>
            <p className={cx(style)}>p5</p>
        </div>
    );
}

export default Game;