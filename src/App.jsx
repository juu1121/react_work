import { NavLink, useNavigate, useOutlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Nav, Navbar } from "react-bootstrap";

function App(){
    //현재 route 된 정보를 출력해주는 hook
    const currentOutlet = useOutlet();
    //javascript 로 route 이동을 하게 해주는 hook
    const navigate = useNavigate();

    return (
     <>
        <Navbar expand="md" className="bg-warning">
            <Container>
                <Navbar.Toggle aria-controls="one"/>
                <Navbar.Brand as={NavLink}>Acorn</Navbar.Brand>
                <Navbar.Collapse>
                    <Nav>
                        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/game">Game</Nav.Link>
                        <Nav.Link as={NavLink} to="/study">Study</Nav.Link>
                        <Nav.Link as={NavLink} to="/posts">Post</Nav.Link>
                    </Nav>
                </Navbar.Collapse> 
            </Container>    
        </Navbar>
        <div className="container">
{/*            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/game">Game</NavLink></li>
                <li><NavLink to="/study">Study</NavLink></li>
                <li><NavLink to="/posts">Post</NavLink></li>
            </ul>
            <button className="btn btn-primary" onClick={()=>{
                //  javascript 로 "/post" 경로로 라우트 되게 하려면?
                navigate("/posts")
            }}>Post</button>
            <button className="btn btn-primary" onClick={()=>{
                //  javascript 로 "/post" 경로로 라우트 되게 하려면?
                navigate("/posts?pageNum=2")
            }}>Post 2page</button> 
*/}            
            <div>{currentOutlet}</div>
        </div>
    </>   
    )
}

export default App;