import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
function Register(){
    const navigate = useNavigate();
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const register = async () => {
        if (!name || !email || !password) {
            toast.error("Please fill all fields!");
            return;
        }

        // ✅ Name validation
        if (!/^[A-Za-z ]+$/.test(name)) {
            toast.error("Name should contain only letters!");
            return;
        }

        // ✅ Email validation
        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error("Please enter a valid email!");
            return;
        }

        // ✅ Password validation
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters!");
            return;
        }


        const user = {

            name,
            email,
            password

        };

        await fetch("https://student-management-system-production-8544.up.railway.app/auth/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(user)

        });
        toast.success("Registration Successful!");

        navigate("/");

        setName("");
        setEmail("");
        setPassword("");

    }
    return(

        <div className="container mt-5">
            <div className="text-center mb-4">
                <h1 className="fw-bold text-success">
                    🎓 Student Management System
                </h1>
                <p className="text-muted">
                    Create your account to get started.
                </p>
            </div>

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow">

                        <div className="card-header bg-success text-white">

                            <h3 className="text-center">
                                Register
                            </h3>

                        </div>

                        <div className="card-body">

                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                pattern="[A-Za-z ]+"
                                title="Name should contain only letters"
                                required
                            />

                            <input
                                type="email"
                                className="form-control mb-3"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <input
                                type="password"
                                className="form-control mb-3"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength="6"
                                required
                            />
                            <button
                                className="btn btn-success w-100"
                                onClick={register}
                            >
                                Register
                            </button>

                        </div>
                        <p className="text-center mt-3">
                            Already have an account?
                            <Link to="/"> Login</Link>
                        </p>
                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;