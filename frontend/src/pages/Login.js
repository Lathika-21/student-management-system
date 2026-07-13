    import { useState } from "react";
    import {toast} from "react-toastify";
    import { Link } from "react-router-dom";
    function Login() {
        
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const login = async () => {
            try {
                const response = await fetch("https://student-management-system-production-8544.up.railway.app/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                });
    
                console.log("Status:", response.status);
    
                if (!response.ok) {
                    toast.error("Login failed!");
                    return;
                }
    
                const data = await response.json();
    
                console.log(data);
    
                if (data) {
                    localStorage.setItem("loggedIn", "true");
                    toast.success("Login Successful!");
                    window.location.href = "/home";
                } else {
                    toast.error("Invalid Email or Password!");
                }
    
            } catch (error) {
                console.error(error);
                toast.error("Cannot connect to backend!");
            }
        };
        return (
    
            <div className="container mt-5">
                <div className="text-center mb-4">
                    <h1 className="fw-bold text-primary">
                        🎓 Student Management System
                    </h1>
                    <p className="text-muted">
                        Welcome! Please login to continue.
                    </p>
                </div>
                <div className="row justify-content-center">
    
                    <div className="col-md-5">
    
                        <div className="card shadow">
    
                            <div className="card-header bg-primary text-white">
    
                                <h3 className="text-center">
                                    Login
                                </h3>
    
                            </div>
    
                            <div className="card-body">
    
                                <input
                                    type="email"
                                    className="form-control mb-3"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
    
                                <input
                                    type="password"
                                    className="form-control mb-3"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
    
                                <button
                                    className="btn btn-primary w-100"
                                    onClick={login}
                                >
                                    Login
                                </button>
    
                            </div>
    
                        </div>
    
                    </div>
    
                </div>
                <p className="text-center mt-3">
                    Don't have an account?
                    <Link to="/register"> Register</Link>
                </p>
            </div>
    
        );
    
    }
    
    export default Login;