import { useState } from "react";

function App(){


    const [names, setNames] = useState(["김구라", "해골", "원숭이", "초기값이배열일수도있다"]);

    const handleAdd=()=>{
        //spread 연산자를 이용해서 기존의 배열에 있는 내용을 펼쳐놓고
        //item이 추가된 새로운 배열을 얻어내서 state변경하기 
        setNames([...names, "추가된 이름"])
    }

    return (
        <div className = "container">
            <h1>배열을 state로 관리해보기 </h1>
            <button onClick={handleAdd}>추가</button>
            <ul>
                {names.map(item => <li>{item}</li>)}
            </ul>
        </div>
    )
}

export default App;