import React from "react";
import Header from "./components/Header";
import Meme from "./components/Meme";
import "./index.css"

function App() {
    return (
        <div className="app">
            <Header/>
            <Meme/>
        </div>
    );
}

export default App;