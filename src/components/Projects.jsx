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

    const [showSuccess, setShowSuccess] = useState(false)

    // ❌ Sales Order removed
    const stages = [
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

    const resetForm = () => {
        setForm({
            name: "",
            salesman: "",
            start: "",
            days: "",
            remark: ""
        })
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

        setShowSuccess(true)
    }

    const toggleStage = async (project, stageName) => {

        const completed = project.stagesCompleted || []

        const alreadyDone = completed.find(s => s.name === stageName)

        if (alreadyDone) {
            alert("❌ This stage is already completed and cannot be modified.")
            return
        }

        const confirmAction = window.confirm(
            `Mark "${stageName}" as completed?\n\nThis action cannot be undone.`
        )

        if (!confirmAction) return

        const today = new Date().toISOString().split("T")[0]

        const updatedStages = [
            ...completed,
            { name: stageName, completedAt: today }
        ]

        const updatedProject = {
            ...project,
            stagesCompleted: updatedStages,
            status: getStatus({ ...project, stagesCompleted: updatedStages })
        }

        await updateProject(project.id, updatedProject)
        reloadProjects()
    }

    const getNextStage = (project) => {
        const completed = project.stagesCompleted || []

        for (let s of stages) {
            if (!completed.find(c => c.name === s.name)) return s.name
        }

        return "Completed"
    }

    // ✅ Sort by START DATE (newest first)
    const sortedProjects = [...projects].sort(
        (a, b) => new Date(b.start) - new Date(a.start)
    )

    return (
        <div className="container-fluid px-4 mt-4">

            <h2 className="mb-4">Project Management</h2>

            {/* 🔥 MODAL POPUP */}
            {showSuccess && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 999
                }}>
                    <div className="card p-4 text-center" style={{ width: "300px" }}>
                        <h5 className="text-success">✅ Project Added</h5>
                        <button
                            className="btn btn-success mt-3"
                            onClick={() => {
                                setShowSuccess(false)
                                resetForm()
                            }}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}

            {/* ADD PROJECT */}
            <div className="card mb-4">
                <div className="card-body">

                    <h5>Add Project</h5>

                    <div className="row g-2">

                        <div className="col-md-3">
                            <input className="form-control"
                                placeholder="Project Name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-2">
                            <select className="form-control"
                                name="salesman"
                                value={form.salesman}
                                onChange={handleChange}
                            >
                                <option value="">Salesman</option>
                                <option>Manjunath</option>
                                <option>Ashish</option>
                                <option>Vijay</option>
                            </select>
                        </div>

                        <div className="col-md-2" >
                            <input
                                type="date"
                                className="form-control"
                                name="start"
                                value={form.start}
                                onChange={handleChange}
                                placeholder="Start Date"
                            />
                        </div>

                        <div className="col-md-2">
                            <input type="number"
                                className="form-control"
                                placeholder="Days"
                                name="days"
                                value={form.days}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-3">
                            <button
                                className="btn btn-primary w-100"
                                onClick={addProject}
                            >
                                Add Project
                            </button>
                        </div>

                    </div>

                </div>
            </div>

            {/* TABLE */}
            <div className="card">
                <div className="card-body">

                    <table className="table table-bordered table-hover">

                        <thead>
                            <tr>
                                <th>Project</th>
                                <th>Start Date</th> {/* ✅ Added */}
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
                                        className={`${getStatus(p) === "Delayed" ? "table-danger" : ""} project-row`}
                                        onClick={() => setOpenRow(openRow === p.id ? null : p.id)}
                                    >

                                        <td className="fw-semibold d-flex align-items-center gap-2">
                                            <span style={{
                                                display: "inline-block",
                                                transition: "transform 0.2s",
                                                transform: openRow === p.id ? "rotate(90deg)" : "rotate(0deg)"
                                            }}>
                                                ▶
                                            </span>
                                            {p.name}
                                        </td>

                                        <td>{p.start}</td> {/* ✅ New column */}
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

                                    <tr>
                                        <td colSpan="6" style={{ padding: 0 }}>
                                            <div style={{
                                                maxHeight: openRow === p.id ? "500px" : "0px",
                                                overflow: "hidden",
                                                transition: "all 0.3s ease",
                                                opacity: openRow === p.id ? 1 : 0
                                            }}>
                                                <div className="d-flex flex-wrap gap-3 p-3">

                                                    {stages.map(stage => {

                                                        const completedObj =
                                                            (p.stagesCompleted || []).find(s => s.name === stage.name)

                                                        const completed = !!completedObj

                                                        return (
                                                            <div key={stage.name}
                                                                className={`border rounded p-2 text-center ${
                                                                    completed ? "bg-success text-white" : "bg-light"
                                                                }`}
                                                                style={{ minWidth: "140px" }}
                                                            >

                                                                <input
                                                                    type="checkbox"
                                                                    checked={completed}
                                                                    disabled={completed}
                                                                    onChange={() => toggleStage(p, stage.name)}
                                                                />

                                                                <div className="fw-bold">
                                                                    {stage.name}
                                                                </div>

                                                                <div style={{ fontSize: "12px" }}>
                                                                    {stage.days} days
                                                                </div>

                                                                {completed && (
                                                                    <div style={{ fontSize: "11px", marginTop: "5px" }}>
                                                                        ✔ Done on: {completedObj.completedAt}
                                                                    </div>
                                                                )}

                                                            </div>
                                                        )
                                                    })}

                                                </div>
                                            </div>
                                        </td>
                                    </tr>

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