import { useState } from "react"

/*
Dashboard displays project statistics
and a project overview table
*/
function Dashboard({ projects = [] }) {

    /*
    Filter state controls which projects
    are displayed in the table
    */
    const [filter, setFilter] = useState("All")

    /*
    Filter project list based on card clicked
    */
    const filteredProjects = projects.filter(p => {

        if (filter === "All") return true

        return p.status === filter

    })

    /*
    Dashboard statistics
    */
    const total = projects.length
    const ongoing = projects.filter(p => p.status === "Ongoing").length
    const completed = projects.filter(p => p.status === "Completed").length
    const delayed = projects.filter(p => p.status === "Delayed").length

    return (

        <div className="container-fluid px-4 mt-4">

            <h2 className="mb-4">Project Dashboard</h2>

            <div className="row mb-4">

                {/* Dashboard cards */}

                <div className="col-md-3">

                    <div className="card text-center"
                        onClick={() => setFilter("All")}>

                        <div className="card-body">

                            <h6>Total Projects</h6>
                            <h3>{total}</h3>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card text-center"
                        onClick={() => setFilter("Ongoing")}>

                        <div className="card-body">

                            <h6>Ongoing</h6>
                            <h3>{ongoing}</h3>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card text-center"
                        onClick={() => setFilter("Completed")}>

                        <div className="card-body">

                            <h6>Completed</h6>
                            <h3>{completed}</h3>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card text-center bg-danger text-white"
                        onClick={() => setFilter("Delayed")}>

                        <div className="card-body">

                            <h6>Delayed</h6>
                            <h3>{delayed}</h3>

                        </div>

                    </div>

                </div>

            </div>

            {/* Project table */}

            <table className="table table-bordered table-hover">

                <thead>

                    <tr>

                        <th>Project</th>
                        <th>Salesman</th>
                        <th>Start</th>
                        <th>Deadline</th>
                        <th>Status</th>
                        <th>Remark</th>

                    </tr>

                </thead>

                <tbody>

                    {filteredProjects.map(p => (

                        <tr key={p.id}
                            className={p.status === "Delayed" ? "table-danger" : ""}>

                            <td>{p.name}</td>
                            <td>{p.salesman}</td>
                            <td>{p.start}</td>
                            <td>{p.deadline}</td>
                            <td>{p.status}</td>
                            <td>{p.remark}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    )

}

export default Dashboard