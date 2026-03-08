import {useState} from "react"

function Dashboard({projects}){

const [filter,setFilter] = useState("All")

const filteredProjects = projects.filter(p=>{
if(filter==="All") return true
return p.status===filter
})

const totalProjects = projects.length
const ongoing = projects.filter(p=>p.status==="Ongoing").length
const completed = projects.filter(p=>p.status==="Completed").length
const delayed = projects.filter(p=>p.status==="Delayed").length

return(

<div className="container-fluid px-4 mt-4">

<h2 className="mb-4">Project Dashboard</h2>

<div className="row mb-4 sticky-top bg-white pt-3 pb-2" style={{top:"56px"}}>

<div className="col-md-3">

<div
className="card text-center dashboard-card"
onClick={()=>setFilter("All")}
>

<div className="card-body">
<h6>Total Projects</h6>
<h3>{totalProjects}</h3>
</div>

</div>

</div>

<div className="col-md-3">

<div
className="card text-center dashboard-card"
onClick={()=>setFilter("Ongoing")}
>

<div className="card-body">
<h6>Ongoing Projects</h6>
<h3>{ongoing}</h3>
</div>

</div>

</div>

<div className="col-md-3">

<div
className="card text-center dashboard-card"
onClick={()=>setFilter("Completed")}
>

<div className="card-body">
<h6>Completed Projects</h6>
<h3>{completed}</h3>
</div>

</div>

</div>

<div className="col-md-3">

<div
className="card text-center dashboard-card bg-danger text-white"
onClick={()=>setFilter("Delayed")}
>

<div className="card-body">
<h6>Delayed Projects</h6>
<h3>{delayed}</h3>
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
<th>Salesman</th>
<th>Start Date</th>
<th>Stage</th>
<th>Deadline</th>
<th>Status</th>
<th>Remark</th>
</tr>

</thead>

<tbody>

{filteredProjects.map(p=>(

<tr
key={p.id}
className={p.status==="Delayed" ? "table-danger":""}
>

<td>{p.name}</td>
<td>{p.salesman}</td>
<td>{p.start}</td>
<td>{p.stage}</td>
<td>{p.deadline}</td>
<td>{p.status}</td>
<td>{p.remark}</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

</div>

)

}

export default Dashboard