function Navbar({setPage}){

return(

<nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow">

<div className="container-fluid px-4">

<a className="navbar-brand fw-bold">
Lanka Swisstek
</a>

<ul className="navbar-nav ms-auto">

<li className="nav-item">
<button className="btn btn-link nav-link text-white"
onClick={()=>setPage("dashboard")}>
Dashboard
</button>
</li>

<li className="nav-item">
<button className="btn btn-link nav-link text-white"
onClick={()=>setPage("projects")}>
Projects
</button>
</li>

<li className="nav-item">
<button className="btn btn-link nav-link text-white"
onClick={()=>setPage("reports")}>
Reports
</button>
</li>

</ul>

</div>

</nav>

)

}

export default Navbar