import { useState } from "react"
import { createProject, updateProject } from "../../api/projectApi"
import ProjectTable from "./ProjectTable"
import StageModal from "./StageModal"
import SuccessModal from "./SuccessModal"
import {
    addDaysToDateString,
    emptyStageModal,
    getNextStage,
    getStatus
} from "./projectUtils"
import "./projects.css"

function Projects({ projects, reloadProjects }) {

    const [openRow, setOpenRow] = useState(null)
    const [showSuccess, setShowSuccess] = useState(false)
    const [sortConfig, setSortConfig] = useState({
        key: "deadline",
        direction: "asc"
    })

    // 🔥 ADD PROJECT FORM STATE
    const [form, setForm] = useState({
        name: "",
        salesman: "",
        start: ""
    })

    // 🔥 STAGE MODAL STATE
    const [stageModal, setStageModal] = useState(emptyStageModal)

    // 🔄 HANDLE INPUT CHANGE
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    // ➕ ADD PROJECT FUNCTION
    const addProject = async () => {

        if (!form.name) {
            alert("Project name required")
            return
        }

        const newProject = {
            name: form.name,
            salesman: form.salesman,
            start: form.start,
            deadline: "",
            stagesCompleted: []
        }

        await createProject(newProject)
        await reloadProjects()

        // ✅ show success popup
        setShowSuccess(true)

        // 🔄 reset form
        setForm({
            name: "",
            salesman: "",
            start: ""
        })
    }

    // 🔥 HANDLE STAGE CLICK
    const handleStageClick = (project, stage) => {
        const done = (project.stagesCompleted || []).find(s => s.name === stage)
        if (done) return

        setStageModal({
            ...emptyStageModal,
            show: true,
            project,
            stage
        })
    }

    // 💾 SAVE STAGE
    const submitStage = async () => {
        const { project, stage, date, remark, days } = stageModal

        if (!date) {
            alert("Please select date")
            return
        }

        let updatedProject = { ...project }

        // 🔥 SITE SURVEY DEADLINE LOGIC
        if (stage === "Site Survey") {

            if (!days) {
                alert("Enter number of days")
                return
            }

            updatedProject.deadline = addDaysToDateString(date, days)
        }

        updatedProject.stagesCompleted = [
            ...(project.stagesCompleted || []),
            { name: stage, completedAt: date, remark: remark || "No Remark" }
        ]

        await updateProject(project.id, updatedProject)
        await reloadProjects()

        setStageModal(emptyStageModal)
    }

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

    const sortedProjects = [...projects].sort((a, b) => {
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

    return (
        <div className="container mt-4">

            {/* ✅ SUCCESS MODAL */}
            <SuccessModal
                show={showSuccess}
                onClose={() => setShowSuccess(false)}
            />

            {/* 🔥 STAGE MODAL */}
            <StageModal
                modal={stageModal}
                setModal={setStageModal}
                submitStage={submitStage}
            />

            {/* 🔥 ADD PROJECT */}
            <div className="card mb-4">
                <div className="card-body">

                    <h5 className="mb-3">Add New Project</h5>

                    <div className="row g-2">

                        {/* Project Name */}
                        <div className="col-md-4">
                            <input
                                className="form-control"
                                placeholder="Project Name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Salesman */}
                        <div className="col-md-3">
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

                        {/* Start Date */}
                        <div className="col-md-3">
                            <input
                                type="date"
                                className="form-control"
                                name="start"
                                value={form.start}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Button */}
                        <div className="col-md-2">
                            <button
                                className="btn btn-primary w-100"
                                onClick={addProject}
                            >
                                Add
                            </button>
                        </div>

                    </div>

                </div>
            </div>

            {/* 📋 PROJECT TABLE */}
            <ProjectTable
                projects={sortedProjects}
                openRow={openRow}
                setOpenRow={setOpenRow}
                handleStageClick={handleStageClick}
                getNextStage={getNextStage}
                getStatus={getStatus}
                handleSort={handleSort}
                getSortIndicator={getSortIndicator}
            />

        </div>
    )
}

export default Projects
