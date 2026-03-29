import { stages } from "./stages"

function ProjectTable({
    projects,
    openRow,
    setOpenRow,
    handleStageClick,
    getNextStage,
    getStatus
}) {

    return (
        <table className="table table-bordered table-hover">

            <thead>
                <tr>
                    <th>Project</th>
                    <th>Start</th>
                    <th>Deadline</th>
                    <th>Stage</th>
                    <th>Status</th>
                    <th>Remark</th>
                </tr>
            </thead>

            <tbody>

                {projects.map(p => (

                    <>
                        <tr
                            key={p.id}
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

                            <td>{p.start || "-"}</td>
                            <td>
                                {
                                    !(p.stagesCompleted || []).find(s => s.name === "Site Survey")
                                        ? "Survey Not Yet Done"
                                        : p.deadline || "-"
                                }
                            </td>
                            <td><b>{getNextStage(p)}</b></td>
                            <td>{getStatus(p)}</td>
                            <td>{p.remark || "No Remark"}</td>

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
                                                            <div>{completedObj.completedAt}</div>
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

                    </>
                ))}

            </tbody>

        </table>
    )
}

export default ProjectTable