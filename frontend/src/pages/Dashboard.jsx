import React from "react"
import '../styles/dashboard.css'
import '../styles/global.css'
import Logo from "../components/Logo"


export default function Dashboard( { user, isAuthenticated } ) {

    if (!isAuthenticated) {
        return(
            <>
            <Logo/>
            <div className="dashboard-container">
                <h1>Error, Cannot Access this Page!</h1>
            </div>
            </>
        )
    } 
    return (
        <>
        <Logo/>
        <button className="filter-button">Filter</button>
        <div className="dashboard-container">
        <h1>Welcome, {user.first_name} {user.last_name}</h1>
        <h2>Only VAI staff will be able to view this page</h2>
        <h2>This is where VAI Staff will be able to visualize data and generate reports</h2>
        </div>
        <button className="blue-button">Download</button>
        </>
    )
}