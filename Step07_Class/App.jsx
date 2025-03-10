/*
    우리가 만든 css파일 import하기
    import 된 css 는 모든 Component에서 공통적으로 사용할수있다.
*/

import Game from "./components/Game";
import Play from "./components/Play";
import Study from "./components/Study";
import "./index.css"
import "bootstrap/dist/css/bootstrap.css";

function App(){

    return (
        <div className="container">
            <h1>인덱스 페이지</h1>
            <Play></Play>
            <Study></Study>
            <Game></Game>
        </div>
    )
}

export default App;