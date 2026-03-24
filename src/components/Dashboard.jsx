import { useState } from "react"

function Dashboard({ projects = [] }) {

    const [filter, setFilter] = useState("All")

    const getStatus = (project) => {
        const completedStages = project.stagesCompleted || []

        if (completedStages.length === 8) return "Completed"

        const today = new Date().toISOString().split("T")[0]

        if (project.deadline < today) return "Delayed"

        return "Ongoing"
    }

    const filteredProjects = projects.filter(p => {
        if (filter === "All") return true
        return getStatus(p) === filter
    })

    const total = projects.length
    const ongoing = projects.filter(p => getStatus(p) === "Ongoing").length
    const completed = projects.filter(p => getStatus(p) === "Completed").length
    const delayed = projects.filter(p => getStatus(p) === "Delayed").length

    return (
        <div className="container-fluid px-4 mt-4">

            <h2 className="mb-4">Project Dashboard</h2>

            <div className="row mb-4">

                <div className="col-md-3 dashboard-card">
                    <div className="card text-center" onClick={() => setFilter("All")}>
                        <div className="card-body">
                            <h6>Total Projects</h6>
                            <h3>{total}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-center" onClick={() => setFilter("Ongoing")}>
                        <div className="card-body">
                            <h6>Ongoing</h6>
                            <h3>{ongoing}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-center" onClick={() => setFilter("Completed")}>
                        <div className="card-body">
                            <h6>Completed</h6>
                            <h3>{completed}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-center bg-danger text-white" onClick={() => setFilter("Delayed")}>
                        <div className="card-body">
                            <h6>Delayed</h6>
                            <h3>{delayed}</h3>
                        </div>
                    </div>
                </div>

            </div>

            <table className="table table-bordered table-hover">

                <thead>
                    <tr>
                        <th>Project</th>
                        <th>Salesman</th>
                        <th>Deadline</th>
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
                            <td>{p.deadline}</td>

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

                            <td>{p.remark}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}

export default Dashboard