import { useState } from "react";
/*
    필요한 추가 package(라이브러리)는 npm install을 이용해서 설치하고 사용하면 된다.
    설치된 package는 package.json파일에 dependences목록에 추가된다.

    npm install uuid
*/
//uuid이 v4를 import해서 uuid라는 이름으로 사용하기기
import { v4 as uuid } from "uuid";


function App(){

    const [names, setNames]=useState(["김구라", "해골", "원숭이"]);
    console.log(uuid())

    return (
        <div>
            <h1>친구 목록</h1>
            <ul>
                {names.map((item,index)=><li key={index}>{item}</li>)}
            </ul>

            <h1>친구목록2</h1>
            <ul>
                {names.map((item)=><li key={uuid()}>{item}</li>)}
            </ul>
        </div>
    )
}

export default App;