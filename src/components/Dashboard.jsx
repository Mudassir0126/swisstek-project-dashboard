import { useState } from "react"
import {
    formatDisplayDate,
    getDeadlineDisplay,
    getLatestRemark,
    getNextStage,
    getStatus
} from "./Projects/projectUtils"

function Dashboard({ projects = [] }) {

    const [filter, setFilter] = useState("All")
    const [sortConfig, setSortConfig] = useState({
        key: "deadline",
        direction: "asc"
    })

    // 📊 Stages list

    // 🔹 STATUS LOGIC
    // 🔹 NEXT STAGE
    // 🔥 LATEST REMARK LOGIC
    // 🔥 DEADLINE LOGIC
    // 🔽 FILTER
    const filteredProjects = projects.filter(p => {
        if (filter === "All") return true
        return getStatus(p) === filter
    })

    const statusOrder = {
        Delayed: 0,
        Ongoing: 1,
        Completed: 2
    }

    const handleSort = (key) => {
        setSortConfig((current) => {
            if (current.key === key) {
                return {
                    key,
                    direction: current.direction === "asc" ? "desc" : "asc"
                }
            }

            return {
                key,
                direction: key === "start" ? "desc" : "asc"
            }
        })
    }

    const getSortIndicator = (key) => {
        if (sortConfig.key !== key) return ""
        return sortConfig.direction === "asc" ? " ▲" : " ▼"
    }

    const sortedProjects = [...filteredProjects].sort((a, b) => {
        let result = 0

        if (sortConfig.key === "status") {
            result = statusOrder[getStatus(a)] - statusOrder[getStatus(b)]
        } else if (sortConfig.key === "start") {
            const aStart = a.start || ""
            const bStart = b.start || ""
            result = aStart.localeCompare(bStart)
        } else {
            const aDeadline = a.deadline || "9999-12-31"
            const bDeadline = b.deadline || "9999-12-31"
            result = aDeadline.localeCompare(bDeadline)
        }

        return sortConfig.direction === "asc" ? result : -result
    })

    // 📊 COUNTS
    const total = projects.length
    const ongoing = projects.filter(p => getStatus(p) === "Ongoing").length
    const completed = projects.filter(p => getStatus(p) === "Completed").length
    const delayed = projects.filter(p => getStatus(p) === "Delayed").length

    return (
        <div className="container-fluid px-4 mt-4">

            <h2 className="mb-4">Project Dashboard</h2>

            {/* 🔥 DASHBOARD CARDS */}
            <div className="row mb-4">

                <div className="col-md-3">
                    <div className={`card text-center dashboard-card ${filter === "All" ? "active-card" : ""}`}
                        onClick={() => setFilter("All")}>
                        <div className="card-body">
                            <h6>Total Projects</h6>
                            <h3>{total}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className={`card text-center dashboard-card ${filter === "Ongoing" ? "active-card" : ""}`}
                        onClick={() => setFilter("Ongoing")}>
                        <div className="card-body">
                            <h6>Ongoing</h6>
                            <h3>{ongoing}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className={`card text-center dashboard-card ${filter === "Completed" ? "active-card" : ""}`}
                        onClick={() => setFilter("Completed")}>
                        <div className="card-body">
                            <h6>Completed</h6>
                            <h3>{completed}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className={`card text-center dashboard-card delayed-card ${filter === "Delayed" ? "active-card" : ""}`}
                        onClick={() => setFilter("Delayed")}>
                        <div className="card-body">
                            <h6>Delayed</h6>
                            <h3>{delayed}</h3>
                        </div>
                    </div>
                </div>

            </div>

            {/* 📋 TABLE */}
            <div className="table-responsive">
            <table className="table table-bordered table-hover dashboard-table align-middle">

                <thead>
                    <tr>
                        <th>Project</th>
                        <th>Salesman</th>
                        <th
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSort("start")}
                        >
                            Start{getSortIndicator("start")}
                        </th>
                        <th
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSort("deadline")}
                        >
                            Deadline{getSortIndicator("deadline")}
                        </th>
                        <th>Stage</th>
                        <th
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSort("status")}
                        >
                            Status{getSortIndicator("status")}
                        </th>
                        <th>Remark</th>
                    </tr>
                </thead>

                <tbody>

                    {sortedProjects.map(p => (

                        <tr key={p.id}
                            className={getStatus(p) === "Delayed" ? "table-danger" : ""}>

                            <td>{p.name}</td>
                            <td>{p.salesman}</td>
                            <td>{formatDisplayDate(p.start)}</td>

                            {/* 🔥 DEADLINE FIX */}
                            <td>{formatDisplayDate(getDeadlineDisplay(p))}</td>

                            {/* STAGE */}
                            <td>
                                <b>{getNextStage(p)}</b>
                            </td>

                            {/* STATUS */}
                            <td>
                                <span className={
                                    getStatus(p) === "Delayed"
                                        ? "badge bg-danger"
                                        : getStatus(p) === "Completed"
                                            ? "badge bg-success"
                                            : "badge bg-warning text-dark"
                                }>
                                    {getStatus(p)}
                                </span>
                            </td>

                            {/* 🔥 LATEST REMARK */}
                            <td>{getLatestRemark(p)}</td>

                        </tr>

                    ))}

                </tbody>

            </table>
            </div>

        </div>
    )
}

export default Dashboard
