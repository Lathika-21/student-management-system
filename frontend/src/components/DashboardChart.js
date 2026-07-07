import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function DashboardChart({ students }) {

    const departments = {};

    students.forEach(student => {

        if (departments[student.department]) {
            departments[student.department]++;
        } else {
            departments[student.department] = 1;
        }

    });

    const data = {

        labels: Object.keys(departments),

        datasets: [

            {
                label: "Students",
                data: Object.values(departments),
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

    const options = {

        responsive: true,

        plugins: {

            legend: {
                display: false
            },

            title: {

                display: true,

                text: "Students by Department"

            }

        }

    };

    return <Bar data={data} options={options} />;

}

export default DashboardChart;