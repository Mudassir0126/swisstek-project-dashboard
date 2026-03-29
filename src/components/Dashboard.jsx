import { useState } from "react"

function Dashboard({ projects = [] }) {

    const [filter, setFilter] = useState("All")

    // 📊 Stages list
    const stages = [
        { name: "Site Survey" },
        { name: "Calculation" },
        { name: "Glass Order" },
        { name: "Powder Coating" },
        { name: "Fabrication" },
        { name: "Installation" },
        { name: "Handover" }
    ]

    // 🔹 STATUS LOGIC
    const getStatus = (project) => {
        const completed = project.stagesCompleted || []

        if (completed.length === stages.length) return "Completed"

        const today = new Date().toISOString().split("T")[0]

        if (project.deadline && project.deadline < today) return "Delayed"

        return "Ongoing"
    }

    // 🔹 NEXT STAGE
    const getNextStage = (project) => {
        const completed = project.stagesCompleted || []

        for (let s of stages) {
            if (!completed.find(c => c.name === s.name)) {
                return s.name
            }
        }

        return "Completed"
    }

    // 🔥 LATEST REMARK LOGIC
    const getLatestRemark = (project) => {
        const stages = project.stagesCompleted || []

        if (stages.length === 0) return "No Remark"

        const latest = stages[stages.length - 1]

        return latest.remark || "No Remark"
    }

    // 🔥 DEADLINE LOGIC
    const getDeadlineDisplay = (project) => {
        const surveyDone = (project.stagesCompleted || [])
            .find(s => s.name === "Site Survey")

        if (!surveyDone) return "Survey Not Yet Done"

        return project.deadline || "-"
    }

    // 🔽 FILTER
    const filteredProjects = projects.filter(p => {
        if (filter === "All") return true
        return getStatus(p) === filter
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
            <table className="table table-bordered table-hover">

                <thead>
                    <tr>
                        <th>Project</th>
                        <th>Salesman</th>
                        <th>Deadline</th>
                        <th>Stage</th>
                        <th>Status</th>
                        <th>Remark</th>
                    </tr>
                </thead>

                <tbody>

                    {filteredProjects.map(p => (

                        <tr key={p.id}
                            className={getStatus(p) === "Delayed" ? "table-danger" : ""}>

                            <td>{p.name}</td>
                            <td>{p.salesman}</td>

                            {/* 🔥 DEADLINE FIX */}
                            <td>{getDeadlineDisplay(p)}</td>

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
    )
}

export default Dashboard