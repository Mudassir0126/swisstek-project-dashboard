import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Dashboard from "./pages/Dashboard"
import Projects from "./features/projects/Projects"
import Reports from "./pages/Reports"

import { getProjects } from "./api/projectApi"

/*
Main root component of the application
Handles global state like project list
*/
function App() {

    /*
    State to store projects fetched from API
    */
    const [projects, setProjects] = useState([])

    /*
    Function that loads projects from backend
    */
    const loadProjects = async () => {
        const data = await getProjects()
        setProjects(data)
    }

    /*
    Runs once when the app loads
    Fetches project data
    */
    useEffect(() => {
        let isMounted = true

        getProjects().then((data) => {
            if (isMounted) {
                setProjects(data)
            }
        })

        return () => {
            isMounted = false
        }
    }, [])

    return (

        <div>

            {/* Top navigation bar */}
            <Navbar />

            {/* Route system for page navigation */}

            <Routes>

                <Route
                    path="/"
                    element={<Dashboard projects={projects} />}
                />

                <Route
                    path="/projects"
                    element={
                        <Projects
                            projects={projects}
                            reloadProjects={loadProjects}
                        />
                    }
                />

                <Route
                    path="/reports"
                    element={<Reports projects={projects} />}
                />

            </Routes>

        </div>

    )

}

export default App
