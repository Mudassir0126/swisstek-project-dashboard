import { Fragment } from "react"
import { stages } from "./stages"
import { formatDisplayDate, getDeadlineDisplay, getLatestRemark } from "./projectUtils"

function ProjectTable({
    projects,
    openRow,
    setOpenRow,
    handleStageClick,
    getNextStage,
    getStatus,
    handleSort,
    getSortIndicator
}) {

    return (
        <div className="table-responsive">
        <table className="table table-bordered table-hover projects-table align-middle">

            <thead>
                <tr>
                    <th>Project</th>
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

                {projects.map(p => (

                    <Fragment key={p.id}>
                        <tr
                            className="project-row"
                            onClick={() => setOpenRow(openRow === p.id ? null : p.id)}
                        >

                            <td>
                                <span style={{
                                    marginRight: "8px",
                                    transform: openRow === p.id ? "rotate(90deg)" : "rotate(0deg)",
                                    display: "inline-block",
                                    transition: "0.2s"
                                }}>
                                    ▶
                                </span>
                                {p.name}
                            </td>

                            <td>{formatDisplayDate(p.start)}</td>
                            <td>{formatDisplayDate(getDeadlineDisplay(p))}</td>
                            <td><b>{getNextStage(p)}</b></td>
                            <td>{getStatus(p)}</td>
                            <td>{getLatestRemark(p)}</td>

                        </tr>

                        {openRow === p.id && (
                            <tr>
                                <td colSpan="6">

                                    <div className="d-flex gap-3 flex-wrap p-2">

                                        {stages.map(stage => {

                                            const completedObj =
                                                (p.stagesCompleted || []).find(s => s.name === stage.name)

                                            const completed = !!completedObj

                                            return (
                                                <div
                                                    key={stage.name}
                                                    className={`card p-2 text-center ${completed ? "bg-success text-white" : ""
                                                        }`}
                                                    style={{
                                                        minWidth: "140px",
                                                        cursor: completed ? "not-allowed" : "pointer"
                                                    }}
                                                    onClick={() => handleStageClick(p, stage.name)}
                                                >
                                                    <div>{stage.name}</div>

                                                    {completed ? (
                                                        <>
                                                            <div>{formatDisplayDate(completedObj.completedAt)}</div>
                                                            <div>{completedObj.remark}</div>
                                                        </>
                                                    ) : (
                                                        <div>Not yet completed</div>
                                                    )}
                                                </div>
                                            )
                                        })}

                                    </div>

                                </td>
                            </tr>
                        )}

                    </Fragment>
                ))}

            </tbody>

        </table>
        </div>
    )
}

export default ProjectTable
