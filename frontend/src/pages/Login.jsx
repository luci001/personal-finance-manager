import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from "react-bootstrap";
import {Link, useNavigate} from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';
import { loginAPI } from "../utils/ApiRequest";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function Login()
{
    const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const [values, setValues] = useState({
    email: "",
    password: "",
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
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = values;

    setLoading(true);

    const { data } = await axios.post(loginAPI, {
      email,
      password,
    });

    if (data.success === true) {
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/home");
      toast.success(data.message, toastOptions);
      setLoading(false);
    } else {
      toast.error(data.message, toastOptions);
      setLoading(false);
    }
  };
    return (
        <>
            <Form style={{color: '#fff',margin: 'auto', height:'100vh', width:'50vh'}} >
                <h1>Login</h1><br></br>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} value={values.email} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange}  value={values.password} />
                </Form.Group>

                <div>
                <Link to="/forgot" className="text-white lnk">Forgot Password?</Link> <br /> <br />
                <Button variant="primary"  className=" text-center mt-3 btnStyle" type="submit" onClick={!loading ? handleSubmit : null}
                  disabled={loading}>
                    {loading ? "Signin…" : "Login"}
                </Button> <br /> <br />
                <p className="text-white lnk">
                    Don't Have An Account? {" "}
                    <Link to="/register" className="text-white lnk">
                        Register
                    </Link>
                </p>
                </div>
    </Form>
    <ToastContainer />
        </>
    )
}

export default Login;