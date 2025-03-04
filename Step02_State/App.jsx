//react를 import 하면 object가 리턴되는데 해당 object의 
//useState라는 방에 있는 함수를useState라는 이름의 변수에 담기
import { useState } from "react";

function App(){

    //상태값 관리
    const [count, setCount] = useState(0)

    const handleMinus = ()=>{
        setCount(count-1)
    }

    const handlePlus = ()=>{
        setCount(count+1)
    }

    const [name, setName] = useState("김구라");

    const [aaa, setaaa] = useState(2000);
    
    const rename = ()=>{
        setName("이름변경")
    }  
    return (
        <div className="container">
            <h1>인덱스 페이지</h1>
            <button onClick={handleMinus}>-</button>
            <strong>{count}</strong>
            <button onClick={handlePlus}>+</button>
            <p>내 이름은 <strong>{name}</strong></p>

            <p>aaa변수명에 숫자를넣어볼까? : <strong>{aaa}</strong></p>

            <button onClick={()=>{
                setName("원숭이")
            }}>이름변경</button>

            <button onClick={rename}>이름변경2</button>
        </div>
    )
}

export default App;