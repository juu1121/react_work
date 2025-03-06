import { useState } from "react";
import Child from "./components/Child";
import Fortune from "./components/Fortune";
import List from "./components/List";

function App(){
    console.log("오잉");

    //오늘의 운세를 상태값으로 관리리
    const [fortuneToday, setFortune] = useState("로또에 당첨이 될꺼에요!");
 
    //이름 목록을 상태값으로 관리
    const [names, setNames] = useState(["김구라", "해골", "원숭이"]);
    return (
        <div className="container">
            <h1>인덱스페이지</h1>
            <Child/>
            <Child/>
            <Child/>
            {/* data라는 property명으로 string type전달하기기 */}
            <Fortune data = {"동쪽으로 가면 귀인을 만나요"}/>
            <Fortune data = {"서쪽으로 가면 조상님님을 만나요"}/>
            <button onClick={()=>{
                 setFortune("남쪽으로 가면 누군가를 만나영");
            }}>운세 변경</button>
            <Fortune data = {fortuneToday}/>
            <List names={names} onDelete={(idx)=>{
                //idx는 삭제할 item의 인덱스가 들어있다.

                //밑의 두 줄을 한번에쓰기 
                //setNames(names.filter((item,index)=>index !== idx));

                //names 배열에서 idx인덱스를 삭제한 새로운 배열을 얻어내서서
                const newArr = names.filter((item,index)=>index !== idx);
                //새로운배열로 상태값응ㄹ 변경한다
                setNames(newArr);

            }}/>
        </div>
    )
}

export default App;