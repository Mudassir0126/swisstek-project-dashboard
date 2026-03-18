import { useState } from "react"

/*
Import API functions used to create and update projects
*/
import { createProject, updateProject } from "../api/projectApi"

function Projects({ projects = [], reloadProjects }) {

    /*
    State to track which table row is expanded
    */
    const [openRow, setOpenRow] = useState(null)

    /*
    State for new project form
    */
    const [form, setForm] = useState({
        name: "",
        salesman: "",
        start: "",
        days: "",
        remark: ""
    })

    /*
    All workflow stages of a project
    */
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

    /*
    Handles input field changes
    */
    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

    }

    /*
    Creates a new project
    Calculates deadline based on days required
    */
    const addProject = async () => {

        const startDate = new Date(form.start)

        const deadline = new Date(startDate)

        deadline.setDate(deadline.getDate() + Number(form.days))

        const newProject = {
            name: form.name,
            salesman: form.salesman,
            start: form.start,
            deadline: deadline.toISOString().split("T")[0],
            remark: form.remark,
            status: "Ongoing",
            stagesCompleted: []
        }

        await createProject(newProject)

        /*
        Reload projects from API after creation
        */
        reloadProjects()

    }

    /*
    Toggle completion of a stage
    */
    const toggleStage = async (project, stage) => {

        const completed = project.stagesCompleted || []

        let updatedStages

        if (completed.includes(stage)) {

            updatedStages = completed.filter(s => s !== stage)

        } else {

            updatedStages = [...completed, stage]

        }

        /*
        Update project in API
        */
        await updateProject(project.id, {
            ...project,
            stagesCompleted: updatedStages
        })

        reloadProjects()

    }

    /*
    Determines the next stage that is not completed
    */
    const getNextStage = (project) => {

        const completed = project.stagesCompleted || []

        for (let s of stages) {

            if (!completed.includes(s.name)) {
                return s.name
            }

        }

        return "Completed"

    }

    return (

        <div className="container-fluid px-4 mt-4">

            <h2 className="mb-4">Project Management</h2>

            {/* -------- ADD PROJECT FORM -------- */}

            <div className="card mb-4">

                <div className="card-body">

                    <h5 className="mb-3">Add New Project</h5>

                    <div className="row g-2">

                        <div className="col-md-3">
                            <input
                                className="form-control"
                                placeholder="Project Name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-2">
                            <select
                                className="form-control"
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

                        <div className="col-md-2">
                            <input
                                type="date"
                                className="form-control"
                                name="start"
                                value={form.start}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-2">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Days Required"
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

            {/* -------- PROJECT TABLE -------- */}

            <div className="card">

                <div className="card-body">

                    <table className="table table-bordered table-hover">

                        <thead>

                            <tr>
                                <th>Project</th>
                                <th>Salesman</th>
                                <th>Start</th>
                                <th>Deadline</th>
                                <th>Current Stage</th>
                                <th>Remark</th>
                            </tr>

                        </thead>

                        <tbody>

                            {projects.map(p => (

                                <>

                                    {/* MAIN ROW */}

                                    <tr
                                        key={p.id}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => setOpenRow(openRow === p.id ? null : p.id)}
                                    >

                                        <td>{p.name}</td>
                                        <td>{p.salesman}</td>
                                        <td>{p.start}</td>
                                        <td>{p.deadline}</td>
                                        <td><b>{getNextStage(p)}</b></td>
                                        <td>{p.remark}</td>

                                    </tr>

                                    {/* EXPANDED ROW WITH STAGES */}

                                    {openRow === p.id && (

                                        <tr>

                                            <td colSpan="6">

                                                <div className="p-3">

                                                    <h6>Project Stages</h6>

                                                    {stages.map(stage => (

                                                        <div key={stage}>

                                                            <label>

                                                                <input
                                                                    type="checkbox"
                                                                    checked={(p.stagesCompleted || []).includes(stage)}
                                                                    onChange={() => toggleStage(p, stage)}
                                                                />

                                                                {" "} {stage}

                                                            </label>

                                                        </div>

                                                    ))}

                                                </div>

                                            </td>

                                        </tr>

                                    )}

                                </>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    )

}

export default Projects