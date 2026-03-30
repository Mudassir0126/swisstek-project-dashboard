import { stages } from "./stages"

export const emptyStageModal = {
    show: false,
    project: null,
    stage: "",
    date: "",
    remark: "",
    days: ""
}

const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
}

const getOrdinal = (day) => {
    if (day >= 11 && day <= 13) return `${day}th`

    const lastDigit = day % 10

    if (lastDigit === 1) return `${day}st`
    if (lastDigit === 2) return `${day}nd`
    if (lastDigit === 3) return `${day}rd`

    return `${day}th`
}

export const formatDisplayDate = (value) => {
    if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return value || "-"

    const [year, month, day] = value.split("-").map(Number)
    const date = new Date(year, month - 1, day)
    const monthName = date.toLocaleString("en-US", { month: "short" })

    return `${getOrdinal(day)} ${monthName} ${year}`
}

export const getCompletedStages = (project) => project.stagesCompleted || []

const getTrackedCompletedStages = (project) => {
    const completedByName = new Map()

    for (const item of getCompletedStages(project)) {
        if (!stages.find((stage) => stage.name === item.name)) continue

        completedByName.set(item.name, item)
    }

    return Array.from(completedByName.values())
}

export const getStatus = (project) => {
    const completed = getTrackedCompletedStages(project)

    if (completed.length === stages.length) return "Completed"

    const today = formatDate(new Date())

    if (project.deadline && project.deadline < today) return "Delayed"

    return "Ongoing"
}

export const getNextStage = (project) => {
    const completed = getTrackedCompletedStages(project)

    for (const stage of stages) {
        if (!completed.find((item) => item.name === stage.name)) {
            return stage.name
        }
    }

    return "Completed"
}

export const getLatestRemark = (project) => {
    const completed = getCompletedStages(project)

    if (completed.length === 0) return "No Remark"

    return completed[completed.length - 1].remark || "No Remark"
}

export const getDeadlineDisplay = (project) => {
    const surveyDone = getCompletedStages(project)
        .find((stage) => stage.name === "Site Survey")

    if (!surveyDone) return "Survey Not Yet Done"

    return project.deadline || "-"
}

export const addDaysToDateString = (dateString, daysToAdd) => {
    const deadline = new Date(`${dateString}T00:00:00`)
    deadline.setDate(deadline.getDate() + Number(daysToAdd))

    return formatDate(deadline)
}
