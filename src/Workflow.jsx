import React from "react";

function Workflow(){

const stages = [

{stage:"Sales Order", assigned:"Admin", status:"Completed"},
{stage:"Site Survey", assigned:"Engineer", status:"Completed"},
{stage:"Calculation", assigned:"Designer", status:"Pending"},
{stage:"Glass Order", assigned:"Purchase", status:"Pending"},
{stage:"Powder Coating", assigned:"Factory", status:"Pending"},
{stage:"Fabrication", assigned:"Factory", status:"Pending"},
{stage:"Installation", assigned:"Site Team", status:"Pending"},
{stage:"Site Handover", assigned:"Manager", status:"Pending"}

]

return(

<div className="container mt-4">

<h2>Project Workflow</h2>

<table className="table table-bordered">

<thead>
<tr>
<th>Stage</th>
<th>Assigned To</th>
<th>Status</th>
</tr>
</thead>

<tbody>

{stages.map((s,i)=>(

<tr key={i}>

<td>{s.stage}</td>
<td>{s.assigned}</td>
<td>{s.status}</td>

</tr>

))}

</tbody>

</table>

</div>

)

}

export default Workflow