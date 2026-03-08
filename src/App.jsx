import {useState} from "react"
import Navbar from "./Navbar.jsx"
import Dashboard from "./Dashboard.jsx"
import Reports from "./Reports.jsx"
import Projects from "./Projects.jsx"

function App(){

const [page,setPage] = useState("dashboard")

const [projects,setProjects] = useState([

{
id:1,
name:"ABC Apartment",
salesman:"Manjunath",
start:"2026-02-10",
stage:"Fabrication",
deadline:"2026-03-25",
remark:"",
status:"Ongoing"
},

{
id:2,
name:"Green Valley Villas",
salesman:"Ashish",
start:"2026-02-18",
stage:"Glass Order",
deadline:"2026-03-22",
remark:"",
status:"Ongoing"
},

{
id:3,
name:"Metro Business Tower",
salesman:"Vijay",
start:"2026-02-05",
stage:"Installation",
deadline:"2026-03-28",
remark:"",
status:"Ongoing"
},

{
id:4,
name:"Sunrise Residency",
salesman:"Manjunath",
start:"2026-02-22",
stage:"Calculation",
deadline:"2026-03-26",
remark:"",
status:"Ongoing"
},

{
id:5,
name:"City Mall Complex",
salesman:"Ashish",
start:"2026-02-12",
stage:"Handover",
deadline:"2026-03-01",
remark:"",
status:"Completed"
},

{
id:6,
name:"Lakeview Apartments",
salesman:"Vijay",
start:"2026-02-28",
stage:"Handover",
deadline:"2026-03-02",
remark:"",
status:"Completed"
},

{
id:7,
name:"Silver Heights",
salesman:"Manjunath",
start:"2026-02-15",
stage:"Handover",
deadline:"2026-03-03",
remark:"",
status:"Completed"
},

{
id:8,
name:"Orchid Residency",
salesman:"Ashish",
start:"2026-03-01",
stage:"Site Survey",
deadline:"2026-03-10",
remark:"Survey delay",
status:"Delayed"
},

{
id:9,
name:"Skyline Towers",
salesman:"Vijay",
start:"2026-02-08",
stage:"Installation",
deadline:"2026-03-11",
remark:"Material shortage",
status:"Delayed"
},

{
id:10,
name:"Palm Grove Villas",
salesman:"Manjunath",
start:"2026-03-03",
stage:"Glass Order",
deadline:"2026-03-12",
remark:"Glass supplier delay",
status:"Delayed"
}

])

return(

<div>

<Navbar setPage={setPage}/>

{page==="dashboard" &&
<Dashboard projects={projects}/>
}

{page==="projects" &&
<Projects projects={projects} setProjects={setProjects}/>
}

{page==="reports" &&
<Reports projects={projects}/>
}

</div>

)

}

export default App