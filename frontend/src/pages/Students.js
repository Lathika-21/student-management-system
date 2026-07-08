import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
function Students() {
    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState([]);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 5;

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {

        setLoading(true);

        const response = await fetch("https://student-management-system-production-240f.up.railway.app/dbstudents");
        const data = await response.json();

        setStudents(data);

        setLoading(false);
    };
    const updateStudent = async () => {
        if (!id || !name || !department) {
            toast.error("Please fill all fields!");
            return;
        }

        if (isNaN(id)) {
            toast.error("ID must be a number!");
            return;
        }
        const student = {
            id: parseInt(id),
            name,
            department
        };

        await fetch("https://student-management-system-production-240f.up.railway.app/dbstudents", {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(student)

        });

        loadStudents();

        setId("");
        setName("");
        setDepartment("");
        toast.success("Student Updated Successfully!");

    };
    const addStudent = async () => {
        if (!id || !name || !department) {
            toast.error("Please fill all fields!");
            return;
        }

        if (isNaN(id)) {
            toast.error("ID must be a number!");
            return;
        }
        const student = {
            id: parseInt(id),
            name,
            department
        };

        await fetch("https://student-management-system-production-240f.up.railway.app/dbstudents", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(student)

        });

        loadStudents();

        setId("");
        setName("");
        setDepartment("");
        toast.success("Student Added Successfully!");
    };

    const editStudent = (student) => {

        setId(student.id);
        setName(student.name);
        setDepartment(student.department);
    };

    const deleteStudent = async (id) => {

        const result = await Swal.fire({
            title: "Delete Student?",
            text: "You won't be able to recover this student!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel"
        });

        if (result.isConfirmed) {

            await fetch(`https://student-management-system-production-240f.up.railway.app/dbstudents/${id}`, {
                method: "DELETE"
            });

            loadStudents();

            toast.success("Student Deleted Successfully!");

        }

    };
    const exportToExcel = () => {

        const worksheet = XLSX.utils.json_to_sheet(students);

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array"
        });

        const file = new Blob(
            [excelBuffer],
            {
                type: "application/octet-stream"
            }
        );

        saveAs(file, "Students.xlsx");
    };
    const exportToPDF = () => {

        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Student Management System", 14, 20);

        autoTable(doc, {
            startY: 30,
            head: [["ID", "Name", "Department"]],
            body: students.map(student => [
                student.id,
                student.name,
                student.department
            ])
        });

        doc.save("Students.pdf");
    };
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

    const currentStudents = filteredStudents.slice(
        indexOfFirstStudent,
        indexOfLastStudent
    );

    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
    return (
    <div className="container-fluid mt-4">

        <h2 className="text-center text-primary fw-bold mb-4">
            🎓 Student Management Dashboard
        </h2>

        <div className="row">

            {/* LEFT CARD */}

            <div className="col-lg-4 mb-4">

                <div className="card shadow-lg border-0">

                    <div className="card-header bg-primary text-white">
                        <h4 className="mb-0">➕ Add / Update Student</h4>
                    </div>

                    <div className="card-body">

                        <div className="mb-3">

                            <label className="form-label">Student ID</label>

                            <input
                                className="form-control"
                                placeholder="Enter ID"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">Student Name</label>

                            <input
                                className="form-control"
                                placeholder="Enter Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">Department</label>

                            <input
                                className="form-control"
                                placeholder="Enter Department"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                            />

                        </div>

                        <div className="d-grid gap-2">

                            <button
                                className="btn btn-success"
                                onClick={addStudent}
                                disabled={!id || !name || !department}
                            >
                                Add Student
                            </button>

                            <button
                                className="btn btn-primary"
                                onClick={updateStudent}
                                disabled={!id || !name || !department}
                            >
                                Update Student
                            </button>

                        </div>

                    </div>

                </div>

            </div>

            {/* RIGHT CARD */}

            <div className="col-lg-8">

                <div className="card shadow-lg border-0">

                    <div className="card-header bg-success text-white">

                        <h4 className="mb-0">
                            👨‍🎓 Student List
                        </h4>

                    </div>

                    <div className="card-body">

                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="🔍 Search by Name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        {loading ? (

                            <div className="text-center py-5">

                                <div className="spinner-border text-primary"></div>

                                <p className="mt-3">
                                    Loading Students...
                                </p>

                            </div>

                        ) : (

                            <>
                                <div className="mb-3">

                                    <button
                                        className="btn btn-success me-2"
                                        onClick={exportToExcel}
                                    >
                                        📥 Export Excel
                                    </button>

                                    <button
                                        className="btn btn-danger"
                                        onClick={exportToPDF}
                                    >
                                        📄 Export PDF
                                    </button>

                                </div>
                                <table className="table table-hover table-striped align-middle">

                                    <thead className="table-dark">

                                    <tr>

                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Department</th>
                                        <th width="170">Actions</th>

                                    </tr>

                                    </thead>

                                    <tbody>

                                    {currentStudents.map(student => (

                                        <tr key={student.id}>

                                            <td>{student.id}</td>

                                            <td>{student.name}</td>

                                            <td>{student.department}</td>

                                            <td>

                                                <button
                                                    className="btn btn-warning btn-sm me-2"
                                                    onClick={() => editStudent(student)}
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => deleteStudent(student.id)}
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>

                                    ))}

                                    </tbody>

                                </table>

                                <div className="d-flex justify-content-between align-items-center">

                                    <button
                                        className="btn btn-secondary"
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                    >
                                        ◀ Previous
                                    </button>

                                    <strong>
                                        Page {currentPage} of {totalPages}
                                    </strong>

                                    <button
                                        className="btn btn-secondary"
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                    >
                                        Next ▶
                                    </button>

                                </div>

                            </>

                        )}

                    </div>

                </div>

            </div>

        </div>

    </div>
);


}

export default Students;