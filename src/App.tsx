import './App.css'
import {RouterProvider} from "react-router-dom";
import {router} from "./routes.tsx";
import ReactQuery from "./components/TanstackProvider/TanstackProvider.tsx";

function App() {

    return (
        <ReactQuery>
        <RouterProvider router={router}/>
        </ReactQuery>
    )
}

export default App
