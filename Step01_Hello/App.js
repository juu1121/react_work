
//이미지를 import해서 logo라는 변수에 담기
import logo from './logo.svg'
//css import하기
import './App.css'
import './custom.css'

function App() {
  //react에서는 inline css를 object로 작성한다!
  const logoStyle={
    width:"100px",
    height:"100px"
  } //세미콜론 생략해도 컨파일과정에 생김..생략할거임

  return (
    <div className="container">
      <h1>인덱스페이지입니다.</h1>
      <img src={logo} alt="" style={logoStyle}/>
    </div>
  );
}

export default App;
