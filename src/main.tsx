import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ComponentPreviews, useInitial} from "./dev";
import {DevSupport} from "@react-buddy/ide-toolbox";
// Polyfill for global in a browser environment
(window as any).global = window;

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <DevSupport ComponentPreviews={ComponentPreviews}
                    useInitialHook={useInitial}
        >
            <App/>
        </DevSupport>
    </React.StrictMode>,
)
