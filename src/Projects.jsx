import {useState} from "react"

function Projects({projects,setProjects}){

const [form,setForm] = useState({
name:"",
salesman:"",
start:"",
stage:"",
deadline:"",
remark:""
})

const stages = [
"Sales Order",
"Site Survey",
"Calculation",
"Glass Order",
"Powder Coating",
"Fabrication",
"Installation",
"Handover"
]

const handleChange=(e)=>{

setForm({
...form,
[e.target.name]:e.target.value
})

}

const addProject=()=>{

const newProject={
id:Date.now(),
...form
}

setProjects([...projects,newProject])

setForm({
name:"",
salesman:"",
start:"",
stage:"",
deadline:"",
remark:""
})

}

const updateField=(id,field,value)=>{

setProjects(projects.map(p=>{

if(p.id===id){
return {...p,[field]:value}
}

return p

}))

}

return(

<div className="container-fluid px-4 mt-4">

<h2 className="mb-4">Project Management</h2>

<div className="card mb-4">

<div className="card-body">

<h5 className="mb-3">Add New Project</h5>

<div className="row g-2">

<div className="col-md-2">
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

<select
className="form-control"
name="stage"
value={form.stage}
onChange={handleChange}
>

<option value="">Stage</option>

{stages.map(s=>(
<option key={s}>{s}</option>
))}

</select>

</div>

<div className="col-md-2">
<input
type="date"
className="form-control"
name="deadline"
value={form.deadline}
onChange={handleChange}
/>
</div>

<div className="col-md-2">
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

<div className="card">

<div className="card-body">

<table className="table table-bordered table-hover">

<thead>

<tr>
<th>Project</th>
<th>Salesman</th>
<th>Start</th>
<th>Stage</th>
<th>Deadline</th>
<th>Remark</th>
</tr>

</thead>

<tbody>

{projects.map(p=>(

<tr key={p.id}>

<td>{p.name}</td>

<td>{p.salesman}</td>

<td>{p.start}</td>

<td>

<select
className="form-control"
value={p.stage}
onChange={(e)=>updateField(p.id,"stage",e.target.value)}
>

{stages.map(s=>(
<option key={s}>{s}</option>
))}

</select>

</td>

<td>

<input
type="date"
className="form-control"
value={p.deadline}
onChange={(e)=>updateField(p.id,"deadline",e.target.value)}
/>

</td>

<td>

<input
className="form-control"
value={p.remark}
onChange={(e)=>updateField(p.id,"remark",e.target.value)}
/>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

</div>

)

}

export default Projects