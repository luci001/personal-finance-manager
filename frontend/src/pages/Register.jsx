import {Form,Button, Container, InputGroup} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import {registerAPI} from '../utils/ApiRequest'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useCallback, useEffect, useState } from "react";

function Register()
{
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/register"); 
    }
  }, [navigate]);
  
  const [show, showPassword] = useState(true)
  const [values, setValues] = useState({
    name : "",
    email : "",
    password : "",
    phone: "",
    dob: "",
    gender: "",
    termsAccepted: false,
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  }

  const handleChange = (e) => {
    setValues({...values , [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

      const {name, email, password,phone,
        dob,
        gender,
        termsAccepted} = values;

      setLoading(false);
     
      const {data} = await axios.post(registerAPI, {
        name,
        email,
        password,
        phone,
        dob,
        gender,
        termsAccepted
      });

      if(data.success === true){
        delete data.user.password;
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.message, toastOptions);
        setLoading(true);
        navigate("/");
      }
      else{
        toast.error(data.message, toastOptions);
        setLoading(false);
      }
    };

    const togglePasswordVisibility = () => {
      setValues({ ...show, showPassword: !showPassword });
    };

    return (
        <>
        <h1 className="text-white text-center">Welcome to Finance Management App</h1>
        <h2 className="text-white text-center mt-5" >Registration</h2>
          <Form style={{width:'30vw',margin:'auto'}}>
            <Form.Group controlId="formBasicName" className="mt-3" >
              <Form.Label className="text-white">Name</Form.Label>
              <Form.Control type="text"  name="name" placeholder="Full name" value={values.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail" className="mt-3">
              <Form.Label className="text-white">Email address</Form.Label>
              <Form.Control type="email"  name="email" placeholder="Enter email" value={values.email} onChange={handleChange}/>
            </Form.Group>

            {/* Phone Nuvalues*/}
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                placeholder="Enter 10-digit phone number"
              />
              {errors.phone && <p className="text-danger">{errors.phone}</p>}
            </Form.Group>

            {/* Date of Birth */}
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={values.dob}
                onChange={handleChange}
              />
              {errors.dob && <p className="text-danger">{errors.dob}</p>}
            </Form.Group>

            {/* Gender Selection */}
            <Form.Group className="mb-3 text-white">
              <Form.Label>Gender</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="radio"
                  label="Male"
                  name="gender"
                  value="Male"
                  checked={values.gender === "Male"}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Female"
                  name="gender"
                  value="Female"
                  checked={values.gender === "Female"}
                  onChange={handleChange}
                />
              </div>
              {errors.gender && <p className="text-danger">{errors.gender}</p>}
            </Form.Group>

            {/* Password Field with Show/Hide */}
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={values.showPassword ? "text" : "password"}
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                />
                <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputGroup>
              {errors.password && <p className="text-danger">{errors.password}</p>}
            </Form.Group>

            {/* Terms and Conditions */}
            <Form.Group className="mb-3 text-white">
              <Form.Check
                type="checkbox"
                label="I accept the Terms and Conditions"
                name="termsAccepted"
                checked={values.termsAccepted}
                onChange={handleChange}
              />
              {errors.termsAccepted && <p className="text-danger">{errors.termsAccepted}</p>}
            </Form.Group>

            <div style={{width: "100%", display: "flex" , alignItems:"center", justifyContent:"center", flexDirection: "column"}} className="mt-4">
              {/* <Link to="/forgotPassword" className="text-white lnk" >Forgot Password?</Link> */}

              <Button
                  type="submit"
                  className=" text-center mt-3 btnStyle"
                  onClick={!loading ? handleSubmit : null}
                  disabled={loading}
                > {loading ? "Registering..." : "Register"}
                </Button>

              <p className="mt-3" style={{color: "#9d9494"}}>Already have an account? <Link to="/" className="text-white lnk" >Login</Link></p>
            </div>
          </Form>
          <ToastContainer />
        </>
    )
}

export default Register