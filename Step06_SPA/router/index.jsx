import { createBrowserRouter, createHashRouter } from "react-router-dom";
import Game from "../pages/Game";
import Home from "../pages/Home";
import Study from "../pages/Study";
import App from "../App";
import Post from "../pages/Post";
import PostForm from "../pages/PostForm";
import PostUpdateForm from "../pages/PostUpdateForm";

//라우팅 정보를 배열에 미리 저장해둔다.
//임폴트해서 단독요소로 만들어둔다.
const routes=[
    //spring boot 서버에 넣어서 실행하면 최초 로딩될때 /index.html 경로로 로딩된다.
    //그럴때도 Home 컴포넌트가 활성화 될 수 있도록 라우트 정보를 추가한다.
    {path:"/index.html", element:<Home/>},
    {path:"/", element:<Home/>},
    {path:"/game", element:<Game/>},
    {path:"/study", element:<Study/>},
    {path:"/posts", element:<Post/>},
    {path:"/posts/new", element:<PostForm/>},
    {path:"/posts/:id/edit", element:<PostUpdateForm/>}
];

//export해줄 router 객체를 만든다.
const router = createHashRouter([{
    path:"/",
    element:<App/>,
    children: routes.map((route)=>{
        return {
            index: route.path === "/", //자식의 path 가 "/" 면 index 페이지 역활을 하게 하기 
            path: route.path === "/" ? undefined : route.path, // path 에 "/" 두개가 표시되지 않게  
            element: route.element //어떤 컴포넌트를 활성화 할것인지 
        }
    })
}]);

export default router;