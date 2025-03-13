import { useOutlet } from "react-router-dom";
//bootstrap css 로딩하기
import "bootstrap/dist/css/bootstrap.css";
import BsNavBar from "./components/BsNavBar";
import LoginModal from "./components/LoginModal";
import { useSelector } from "react-redux";

function App(){
    //현재 route 된 정보를 출력해주는 hook
    const currentOutlet = useOutlet();
    //로그인모달의 상태값을 redux store로 부터 얻어낸다.
    const loginModal = useSelector(state=>state.loginModal);
    return (
        <>
            <BsNavBar/>
            <div className="container" style={{marginTop:"60px"}}>
                <div>{currentOutlet}</div>
            </div>
            <LoginModal show={loginModal.show}/>
        </>

    )
}

export default App;