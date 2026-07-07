
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Students from "./pages/Students";
import About from "./pages/About";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

function App() {

    const isLoggedIn = localStorage.getItem("loggedIn") === "true";

    return (
        <BrowserRouter>

            {isLoggedIn && (

                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

                    <div className="container">

                        <Link className="navbar-brand" to="/home">
                            🎓 Student Management
                        </Link>

                        <div className="navbar-nav ms-auto">

                            <Link className="nav-link" to="/home">
                                Home
                            </Link>

                            <Link className="nav-link" to="/students">
                                Students
                            </Link>

                            <Link className="nav-link" to="/about">
                                About
                            </Link>

                            <button
                                className="btn btn-danger ms-3"
                                onClick={() => {
                                    localStorage.removeItem("loggedIn");
                                    window.location.href = "/";
                                }}
                            >
                                Logout
                            </button>

                        </div>

                    </div>

                </nav>

            )}

            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/students"
                    element={
                        <ProtectedRoute>
                            <Students />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/about"
                    element={
                        <ProtectedRoute>
                            <About />
                        </ProtectedRoute>
                    }
                />

            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={3000}
            />

        </BrowserRouter>
    );
}

export default App;