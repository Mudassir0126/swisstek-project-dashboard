import React from "react"
import ReactDOM from "react-dom/client"

/*
Import Bootswatch Lux theme (Bootstrap + Lux styling)
This makes all Bootstrap classes work across the app
*/
import "bootswatch/dist/lux/bootstrap.min.css"
import "./index.css"

/*
HashRouter is used instead of BrowserRouter so the
app works correctly when deployed on GitHub Pages.
*/
import { HashRouter } from "react-router-dom"

import App from "./App"

/*
This renders the root React application
inside the index.html div with id="root"
*/
ReactDOM.createRoot(document.getElementById("root")).render(

<HashRouter>
<App />
</HashRouter>

)
