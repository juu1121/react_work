import Child from "./components/Child";
import Fortune from "./components/Fortune";

function App(){

    return (
        <div className="container">
            <h1>인덱스페이지</h1>
            <Child/>
            <Child/>
            <Child/>
            {/* data라는 property명으로 string type전달하기기 */}
            <Fortune data = {"동쪽으로 가면 귀인을 만나요"}/>
            <Fortune data = {"서쪽으로 가면 조상님님을 만나요"}/>
        </div>
    )
}

export default App;