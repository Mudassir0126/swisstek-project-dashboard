/*
Simple report page showing summary data
*/
function Reports({ projects = [] }) {

    return (

        <div className="container-fluid px-4 mt-4">

            <h2>Reports</h2>

            <div className="card">

                <div className="card-body">

                    Total Projects: {projects.length}

                </div>

            </div>

        </div>

    )

}

export default Reports