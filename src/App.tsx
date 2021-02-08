import React, { useState, useEffect } from "react";
import logo from "./logo.svg";

import "./index.css";
import { colors } from "./colors";

import { Quote } from "./Quote";

function App() {
    const [colorIndex, setColorIndex] = useState(0);
    const [colorTheme, setColorTheme] = useState(colors[colorIndex]);

    useEffect(() => {
        setColorTheme(colors[colorIndex % colors.length]);
    }, [colorIndex]);

    return (
        <div className="App" style={{ backgroundColor: colorTheme }}>
            <Quote colorTheme={colorTheme} />
        </div>
    );
}

export default App;
