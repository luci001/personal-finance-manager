import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginAPI } from "../../utils/ApiRequest";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({ email: "", password: "" });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;
    setLoading(true);

    try {
      const { data } = await axios.post(loginAPI, { email, password });

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
        toast.success(data.message, toastOptions);
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", toastOptions);
    } finally {
      setLoading(false);
    }
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div 
      style={{
         position: "fixed",
         top: 0,
         left: 0,
         width: "100vw",
         height: "100vh",
         backgroundImage: "url('/bg1.jpeg')",
         backgroundSize: "cover",
         backgroundPosition: "center",
         backgroundRepeat: "no-repeat",
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
         }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          particles: {
            number: { value: 200, density: { enable: true, value_area: 800 } },
            color: { value: "#ffcc00" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: { enable: true, minimumValue: 1 } },
            move: { enable: true, speed: 2 },
          },
          detectRetina: true,
        }}
        style={{
          position: "absolute",
          zIndex: -1,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="login-container"
          style={{
            width: "350px",
            height: "450px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            borderRadius: "10px",
            zIndex: "2",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 4px 10px rgba(4, 1, 1, 0.3)"
          }}
        >
          <h1 className="text-center">
            <AccountBalanceWalletIcon sx={{ fontSize: 40, color: "white" }} />
          </h1>
          <h2 className="text-white text-center">Login</h2>
          <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mt-3">
              <Form.Label className="text-white text-start w-100">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={handleChange}
                value={values.email}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Label className="text-white text-start w-100">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={values.password}
                required
              />
            </Form.Group>

            <div className="text-center mt-4">
              <Link to="/forgotPassword" className="text-white">Forgot Password?</Link>

              <Button
                type="submit"
                className="mt-3 w-100"
                variant="primary"
                disabled={loading}
              >
                {loading ? "Signing in…" : "Login"}
              </Button>

              <p className="mt-3" style={{ color: "#9d9494" }}>
                Don't Have an Account?{" "}
                <Link to="/register" className="text-blue">Register</Link>
              </p>
            </div>
          </Form>
        </div>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Login;