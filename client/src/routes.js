import React from "react";
import {Routes, Route} from "react-router-dom";
import {LinksPage} from "./pages/LinksPage";
import {CreatePage} from "./pages/CreatePage";
import {DetailPage} from "./pages/DetailPage";
import {AuthPage} from "./pages/AuthPage";
import {NotFoundPage} from "./pages/NotFoundPage";

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route exact path={'/links'} element={<LinksPage/>}/>
                <Route exact path={'/create'} element={<CreatePage/>} />
                <Route path={'/detail/:id'} element={<DetailPage/>} />
                <Route path={'*'} element={<CreatePage/>} />
                {/*<Route path={'*'} element={<CreatePage/>} />*/}
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path={'/'} exact element={<AuthPage/>}/>
            <Route path={'*'} element={<NotFoundPage/>} />
            {/*<Route path={'*'} element={<AuthPage/>} />*/}
        </Routes>
    )
}