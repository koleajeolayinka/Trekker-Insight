import React from "react";
import ReactDOM from "react-dom/client";
import {SisenseContextProvider, ThemeProvider} from "@sisense/sdk-ui";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from "./layout.tsx";
import "./index.css";

const sisenseContextProviderArgs = () => {
    const baseOptions = {
        url: import.meta.env.VITE_APP_SISENSE_URL,
        defaultDataSource: "Sample ECommerce",
    };
    const wat = import.meta.env.VITE_APP_SISENSE_WAT;
    const token = import.meta.env.VITE_APP_SISENSE_API_TOKEN;
    const ssoEnabled = import.meta.env.VITE_APP_SISENSE_SSO_ENABLED;

    if (ssoEnabled) {
        return {...baseOptions, ssoEnabled: ssoEnabled?.toLowercase() === "true"};
    } else if (wat) {
        return {...baseOptions, wat};
    } else if (token) {
        return {...baseOptions, token};
    } else {
        return baseOptions;
    }
};

ReactDOM.createRoot(document.getElementById("root")!).render(
    <SisenseContextProvider {...sisenseContextProviderArgs()}>
        <ThemeProvider
            theme={{
                typography: {
                    fontFamily: "Optimistic",
                },
            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </SisenseContextProvider>,
);
