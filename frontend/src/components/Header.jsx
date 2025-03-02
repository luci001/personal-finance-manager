import { Button } from "react-bootstrap"
import {useNavigate} from "react-router-dom"

function Header()
{
    const navigate = useNavigate();

  const handleShowLogin = () =>{
    navigate("/");
  }
  
    return (
        <>
            <div style={{borderRadius:'5px', backgroundColor:'white',height:'70px',display:'flex',justifyContent:'space-between', color:'black', width:'60vw',margin:'auto'}}>
                <p style={{margin:'10px', fontSize:'30px'}} className="text-black lnk">Finance Management App</p>
                {/* <h3>Hello This is header</h3> */}
                <Button variant="outline-danger" onClick={handleShowLogin} style={{marginRight:'20px',height:'50%',marginTop:'20px',padding:'5px'}}>Logout</Button>
            </div>
        </>
    )
}

export default Header