import {
    formatDisplayDate,
    getDeadlineDisplay,
    getNextStage,
    getStatus
} from "./Projects/projectUtils"

function Reports({ projects = [] }) {

    const today = new Date()
    const todayString = today.toISOString().split("T")[0]

    const addDays = (date, days) => {
        const nextDate = new Date(date)
        nextDate.setDate(nextDate.getDate() + days)
        return nextDate.toISOString().split("T")[0]
    }

    const upcomingCutoff = addDays(today, 14)

    const total = projects.length
    const ongoing = projects.filter((project) => getStatus(project) === "Ongoing").length
    const completed = projects.filter((project) => getStatus(project) === "Completed").length
    const delayed = projects.filter((project) => getStatus(project) === "Delayed").length

    const delayedProjects = projects
        .filter((project) => getStatus(project) === "Delayed")
        .sort((a, b) => (a.deadline || "").localeCompare(b.deadline || ""))

    const upcomingProjects = projects
        .filter((project) => {
            const deadline = getDeadlineDisplay(project)
            return deadline !== "Survey Not Yet Done" && deadline >= todayString && deadline <= upcomingCutoff
        })
        .sort((a, b) => getDeadlineDisplay(a).localeCompare(getDeadlineDisplay(b)))

    const salesmanSummary = Object.entries(
        projects.reduce((summary, project) => {
            const salesman = project.salesman || "Unassigned"

            if (!summary[salesman]) {
                summary[salesman] = {
                    total: 0,
                    ongoing: 0,
                    completed: 0,
                    delayed: 0
                }
            }

            const status = getStatus(project)

            summary[salesman].total += 1
            summary[salesman][status.toLowerCase()] += 1

            return summary
        }, {})
    ).sort((a, b) => b[1].total - a[1].total)

    return (

        <div className="container-fluid px-4 mt-4">

            <h2 className="mb-4">Reports</h2>

            <div className="row g-3 mb-4">
                <div className="col-md-3">
                    <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body">
                            <div className="text-muted small">Total Projects</div>
                            <h3 className="mb-0">{total}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body">
                            <div className="text-muted small">Ongoing</div>
                            <h3 className="mb-0 text-warning">{ongoing}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body">
                            <div className="text-muted small">Completed</div>
                            <h3 className="mb-0 text-success">{completed}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body">
                            <div className="text-muted small">Delayed</div>
                            <h3 className="mb-0 text-danger">{delayed}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                <div className="col-lg-7">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="mb-3">Delayed Projects</h5>

                            {delayedProjects.length === 0 ? (
                                <p className="text-muted mb-0">No delayed projects right now.</p>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-sm align-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th>Project</th>
                                                <th>Salesman</th>
                                                <th>Deadline</th>
                                                <th>Next Stage</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {delayedProjects.map((project) => (
                                                <tr key={project.id}>
                                                    <td>{project.name}</td>
                                                    <td>{project.salesman}</td>
                                                    <td>{formatDisplayDate(project.deadline)}</td>
                                                    <td>{getNextStage(project)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-lg-5">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="mb-3">Upcoming Deadlines</h5>
                            <p className="text-muted small">
                                Projects due within the next 14 days.
                            </p>

                            {upcomingProjects.length === 0 ? (
                                <p className="text-muted mb-0">No upcoming deadlines in the next 14 days.</p>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-sm align-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th>Project</th>
                                                <th>Deadline</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {upcomingProjects.map((project) => (
                                                <tr key={project.id}>
                                                    <td>{project.name}</td>
                                                    <td>{formatDisplayDate(getDeadlineDisplay(project))}</td>
                                                    <td>{getStatus(project)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="mb-3">Projects By Salesman</h5>

                            {salesmanSummary.length === 0 ? (
                                <p className="text-muted mb-0">No project data available yet.</p>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table align-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th>Salesman</th>
                                                <th>Total</th>
                                                <th>Ongoing</th>
                                                <th>Completed</th>
                                                <th>Delayed</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {salesmanSummary.map(([salesman, summary]) => (
                                                <tr key={salesman}>
                                                    <td>{salesman}</td>
                                                    <td>{summary.total}</td>
                                                    <td>{summary.ongoing}</td>
                                                    <td>{summary.completed}</td>
                                                    <td>{summary.delayed}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )

}

export default Reports
