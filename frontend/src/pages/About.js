function About() {
    return (
        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-body">

                    <h2 className="text-primary">
                        About Student Management System
                    </h2>

                    <hr />

                    <p>
                        This is a Full Stack Student Management System developed
                        using React, Spring Boot, and MySQL.
                    </p>

                    <h5>Technologies Used</h5>

                    <ul>
                        <li>React.js</li>
                        <li>Spring Boot</li>
                        <li>Spring Data JPA</li>
                        <li>MySQL</li>
                        <li>Bootstrap 5</li>
                        <li>React Router</li>
                        <li>React Toastify</li>
                        <li>Chart.js</li>
                    </ul>

                    <h5>Features</h5>

                    <ul>
                        <li>✔ Login & Register</li>
                        <li>✔ Student CRUD Operations</li>
                        <li>✔ Search Students</li>
                        <li>✔ Pagination</li>
                        <li>✔ Dashboard</li>
                        <li>✔ Charts</li>
                        <li>✔ PDF Export</li>
                        <li>✔ Responsive UI</li>
                    </ul>

                </div>

            </div>

        </div>
    );
}

export default About;