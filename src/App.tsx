import './App.css'
import {RouterProvider} from "react-router-dom";
import {router} from "./routes.tsx";
import ReactQuery from "./components/TanstackProvider/TanstackProvider.tsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function App() {

    return (
        <ReactQuery>
            <ToastContainer/>
        <RouterProvider router={router}/>
        </ReactQuery>
    )
}

export default App
