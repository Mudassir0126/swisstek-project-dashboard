import { Link } from "react-router-dom"

/*
Navigation bar displayed on all pages
*/
function Navbar() {

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">

            <div className="container-fluid px-4">

                {/* Company name */}
                <span className="navbar-brand fw-bold">

                    Lanka Swisstek

                </span>

                <ul className="navbar-nav ms-auto">

                    <li className="nav-item">

                        {/* Link to dashboard */}
                        <Link className="nav-link text-white" to="/">
                            Dashboard
                        </Link>

                    </li>

                    <li className="nav-item">

                        {/* Link to project management page */}
                        <Link className="nav-link text-white" to="/projects">
                            Projects
                        </Link>

                    </li>

                    <li className="nav-item">

                        {/* Link to reports page */}
                        <Link className="nav-link text-white" to="/reports">
                            Reports
                        </Link>

                    </li>

                </ul>

            </div>

        </nav>

    )

}

export default Navbar