function Reports(){

const reportData = [

{
project:"ABC Apartment",
completed:5,
pending:2,
delayed:0
},

{
project:"XYZ Mall",
completed:3,
pending:1,
delayed:1
},

{
project:"Green Valley Villas",
completed:4,
pending:2,
delayed:0
}

]

return(

<div className="container-fluid px-4 mt-4">

<h2 className="mb-4">Project Reports</h2>

<div className="card">

<div className="card-body">

<table className="table table-bordered table-striped">

<thead>

<tr>
<th>Project</th>
<th>Completed Tasks</th>
<th>Pending Tasks</th>
<th>Delayed Tasks</th>
</tr>

</thead>

<tbody>

{reportData.map((r,i)=>(

<tr key={i}>

<td>{r.project}</td>

<td className="text-success">{r.completed}</td>

<td>{r.pending}</td>

<td className="text-danger">{r.delayed}</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

</div>

)

}

export default Reports