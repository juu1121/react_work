import { useLocation, useOutlet } from "react-router-dom";
//bootstrap css 로딩하기 
import 'bootstrap/dist/css/bootstrap.css'
import BsNavBar from "./components/BsNavBar";
import LoginModal from "./components/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AnimatePresence, motion } from "framer-motion";

function App(){

    const currentOutlet=useOutlet();
    //로그인 모달의 상태값을 redux store 로 부터 얻어낸다.
    const loginModal= useSelector(state=>state.loginModal);
    const dispatch = useDispatch();


    //ㅠㅠ토큰만료 새로고침할때마다 로그인안풀리게
    //App component 가 활성화 되는 시점에 token 관련 처리
    useEffect(()=>{
        const token=localStorage.token;
        //만일 토큰이 존재한다면
        if(token){
            axios.get("/ping", {
                headers:{Authorization:token}
            })
            .then(res=>{
                //axios 의 요청해더에 자동으로 토큰이 포함되도록한다.
                axios.defaults.headers.common["Authorization"]=token;
                //여기가 실행되면 사용가능한 token 이라는 의미이다 
                //토큰을 디코딩해서 userName 을 얻어온다. 
                const decoded=jwtDecode(token.substring(7));
                console.log("jwt토큰 디코드결과 : ");
                console.log(decoded);
                //발행할 action
                const action={type:"USER_INFO", payload:{
                    userName:decoded.sub,
                    role:decoded.role
                }};
                    //액션 발행하기
                    dispatch(action);
                })
            .catch(error=>{
                delete localStorage.token;
            })
        }
    }, []);

    const location = useLocation();

    return (
        <>
            <BsNavBar/>
            <div className="container" style={{marginTop:"60px"}}>

            <div style={{ position: "relative", overflow: "hidden" }}>
                <AnimatePresence mode="wait">
                        {/* key가 바뀌면 AnimatePresence가 페이지 전환으로 인식 */}
                        <motion.div
                            key={location.pathname} //경로변경감지
                            initial={{ opacity: 0 }}    //초기상태
                            animate={{ opacity: 1 }}    //애니메이셕효과
                            exit={{ opacity: 0 }}   //사라질떄효과과
                            transition={{ duration: 0.2 }} //적용되는시간
                        >
                        <div>{currentOutlet}</div>
                        </motion.div>
                </AnimatePresence>
            </div>

                {/* key가 바뀌면 AnimatePresence가 페이지 전환으로 인식 */}
                {/* <div style={{ position: "relative", overflow: "hidden", height: "100vh"  }}>
                    <AnimatePresence mode="wait">
                        
                        <motion.div
                            key={location.pathname}
                            initial={{ x: "100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "-100%", opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            }}
                        >
                        <div>{currentOutlet}</div>
                        </motion.div>
                    </AnimatePresence>
                </div> */}


            </div>
            <LoginModal show={loginModal.show}/>
        </>
        
    )
}

export default App;