import { useEffect, useState } from "react";

import {
    Pie
} from "react-chartjs-2";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);
function Home() {

    const [students, setStudents] = useState([]);

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        const response = await fetch("https://student-management-system-production-240f.up.railway.app/dbstudents");
        const data = await response.json();
        setStudents(data);
    };
    const departmentCount = {};

    students.forEach(student => {

        departmentCount[student.department] =
            (departmentCount[student.department] || 0) + 1;

    });

    const pieData = {

        labels: Object.keys(departmentCount),

        datasets: [

            {

                label: "Students",

                data: Object.values(departmentCount),

                backgroundColor: [
                    "#0d6efd",
                    "#198754",
                    "#ffc107",
                    "#dc3545",
                    "#6f42c1",
                    "#20c997"
                ]

            }

        ]

    };
    const departments = [...new Set(students.map(s => s.department))];

    return (

        <div className="container mt-4">

            <h2 className="text-center text-primary mb-5">
                Dashboard
            </h2>

            <div className="row">

                <div className="col-md-4">

                    <div className="card text-white bg-primary shadow">

                        <div className="card-body text-center">

                            <h4>Total Students</h4>

                            <h1>{students.length}</h1>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card text-white bg-success shadow">

                        <div className="card-body text-center">

                            <h4>Departments</h4>

                            <h1>{departments.length}</h1>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card text-white bg-warning shadow">

                        <div className="card-body text-center">

                            <h4>Average/Page</h4>

                            <h1>5</h1>

                        </div>

                    </div>

                </div>

            </div>
            <div className="card shadow mt-4">

                <div className="card-header bg-dark text-white">

                    <h4 className="mb-0">
                        📊 Students by Department
                    </h4>

                </div>

                <div className="card-body">

                    <div
                        style={{
                            width: "450px",
                            margin: "auto"
                        }}
                    >

                        <Pie data={pieData} />

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Home;