import { useState } from "react"
import { createProject, updateProject } from "../../api/projectApi"
import { stages } from "./stages"
import ProjectTable from "./ProjectTable"
import StageModal from "./StageModal"
import SuccessModal from "./SuccessModal"
import "./projects.css"

function Projects({ projects, reloadProjects }) {

    const [openRow, setOpenRow] = useState(null)
    const [showSuccess, setShowSuccess] = useState(false)

    const [stageModal, setStageModal] = useState({
        show: false,
        project: null,
        stage: "",
        date: "",
        remark: "",
        days: ""
    })

    const handleStageClick = (project, stage) => {
        const done = (project.stagesCompleted || []).find(s => s.name === stage)
        if (done) return

        setStageModal({ show: true, project, stage })
    }

    const submitStage = async () => {
        const { project, stage, date, remark, days } = stageModal

        let updatedProject = { ...project }

        if (stage === "Site Survey") {
            const deadline = new Date(date)
            deadline.setDate(deadline.getDate() + Number(days))
            updatedProject.deadline = deadline.toISOString().split("T")[0]
        }

        updatedProject.stagesCompleted = [
            ...(project.stagesCompleted || []),
            { name: stage, completedAt: date, remark }
        ]

        await updateProject(project.id, updatedProject)
        reloadProjects()
        setStageModal({ show: false })
    }

    return (
        <div className="container mt-4">

            <SuccessModal
                show={showSuccess}
                onClose={() => setShowSuccess(false)}
            />

            <StageModal
                modal={stageModal}
                setModal={setStageModal}
                submitStage={submitStage}
            />

            <ProjectTable
                projects={projects}
                openRow={openRow}
                setOpenRow={setOpenRow}
                handleStageClick={handleStageClick}
                getNextStage={(p) => {
                    for (let s of stages) {
                        if (!p.stagesCompleted?.find(c => c.name === s.name)) return s.name
                    }
                    return "Completed"
                }}
                getStatus={(p) => {
                    if ((p.stagesCompleted || []).length === stages.length) return "Completed"
                    return "Ongoing"
                }}
            />

        </div>
    )
}

export default Projects