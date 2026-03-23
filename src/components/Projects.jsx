import React, { useState } from "react"
import { createProject, updateProject } from "../api/projectApi"

function Projects({ projects = [], reloadProjects }) {

    const [openRow, setOpenRow] = useState(null)

    const [form, setForm] = useState({
        name: "",
        salesman: "",
        start: "",
        days: "",
        remark: ""
    })

    const stages = [
        { name: "Sales Order", days: 1 },
        { name: "Site Survey", days: 2 },
        { name: "Calculation", days: 2 },
        { name: "Glass Order", days: 3 },
        { name: "Powder Coating", days: 2 },
        { name: "Fabrication", days: 4 },
        { name: "Installation", days: 3 },
        { name: "Handover", days: 1 }
    ]

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const getStatus = (project) => {
        const completed = project.stagesCompleted || []

        if (completed.length === stages.length) return "Completed"

        const today = new Date().toISOString().split("T")[0]

        if (project.deadline < today) return "Delayed"

        return "Ongoing"
    }

    const getEscalation = (project) => {

        const completed = project.stagesCompleted || []
        const currentStageIndex = completed.length
        const currentStage = stages[currentStageIndex]

        if (!currentStage) return null

        const today = new Date()
        const start = new Date(project.start)

        const daysPassed = Math.floor((today - start) / (1000 * 60 * 60 * 24))

        let expectedDays = 0
        for (let i = 0; i <= currentStageIndex; i++) {
            expectedDays += stages[i].days
        }

        if (daysPassed > expectedDays) {
            return `Delay in ${currentStage.name}`
        }

        return null
    }

    const addProject = async () => {

        if (!form.name || !form.start || !form.days) {
            alert("Fill all fields")
            return
        }

        const startDate = new Date(form.start)
        const deadline = new Date(startDate)

        deadline.setDate(deadline.getDate() + Number(form.days))

        const newProject = {
            name: form.name,
            salesman: form.salesman,
            start: form.start,
            deadline: deadline.toISOString().split("T")[0],
            remark: form.remark,
            stagesCompleted: []
        }

        await createProject(newProject)
        reloadProjects()
    }

    const toggleStage = async (project, stage) => {

        const completed = project.stagesCompleted || []

        const updatedStages = completed.includes(stage)
            ? completed.filter(s => s !== stage)
            : [...completed, stage]

        const updatedProject = {
            ...project,
            stagesCompleted: updatedStages,
            status: getStatus({ ...project, stagesCompleted: updatedStages }),
            remark:
                getStatus({ ...project, stagesCompleted: updatedStages }) === "Delayed"
                    ? "Auto delayed"
                    : project.remark
        }

        await updateProject(project.id, updatedProject)
        reloadProjects()
    }

    const getNextStage = (project) => {
        const completed = project.stagesCompleted || []

        for (let s of stages) {
            if (!completed.includes(s.name)) return s.name
        }

        return "Completed"
    }

    const sortedProjects = [...projects].sort(
        (a, b) => new Date(a.deadline) - new Date(b.deadline)
    )

    return (
        <div className="container-fluid px-4 mt-4">

            <h2 className="mb-4">Project Management</h2>

            <div className="card mb-4">
                <div className="card-body">

                    <h5>Add Project</h5>

                    <div className="row g-2">

                        <div className="col-md-3">
                            <input className="form-control" placeholder="Project Name"
                                name="name" onChange={handleChange} />
                        </div>

                        <div className="col-md-2">
                            <select className="form-control"
                                name="salesman" onChange={handleChange}>
                                <option value="">Salesman</option>
                                <option>Manjunath</option>
                                <option>Ashish</option>
                                <option>Vijay</option>
                            </select>
                        </div>

                        <div className="col-md-2">
                            <input type="date" className="form-control"
                                name="start" onChange={handleChange} />
                        </div>

                        <div className="col-md-2">
                            <input type="number" className="form-control"
                                placeholder="Days" name="days"
                                onChange={handleChange} />
                        </div>

                        <div className="col-md-3">
                            <button className="btn btn-primary w-100"
                                onClick={addProject}>
                                Add Project
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-body">

                    <table className="table table-bordered table-hover">

                        <thead>
                            <tr>
                                <th>Project</th>
                                <th>Deadline</th>
                                <th>Stage</th>
                                <th>Status</th>
                                <th>Escalation</th>
                            </tr>
                        </thead>

                        <tbody>

                            {sortedProjects.map(p => (

                                <React.Fragment key={p.id}>

                                    <tr
                                        className={getStatus(p) === "Delayed" ? "table-danger" : ""}
                                        onClick={() => setOpenRow(openRow === p.id ? null : p.id)}
                                        style={{ cursor: "pointer" }}
                                    >

                                        <td>{p.name}</td>
                                        <td>{p.deadline}</td>
                                        <td><b>{getNextStage(p)}</b></td>

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

                                        <td className="text-danger fw-bold">
                                            {getEscalation(p) || "-"}
                                        </td>

                                    </tr>

                                    {openRow === p.id && (
                                        <tr>
                                            <td colSpan="5">

                                                <div className="d-flex flex-wrap gap-3 p-3">

                                                    {stages.map(stage => {

                                                        const completed =
                                                            (p.stagesCompleted || []).includes(stage.name)

                                                        return (
                                                            <div key={stage.name}
                                                                className={`border p-2 text-center ${completed ? "bg-success text-white" : ""}`}
                                                            >

                                                                <input type="checkbox"
                                                                    checked={completed}
                                                                    onChange={() => toggleStage(p, stage.name)}
                                                                />

                                                                <div>{stage.name}</div>
                                                                <small>{stage.days} days</small>

                                                            </div>
                                                        )
                                                    })}

                                                </div>

                                            </td>
                                        </tr>
                                    )}

                                </React.Fragment>

                            ))}

                        </tbody>

                    </table>

                </div>
            </div>

        </div>
    )
}

export default Projects