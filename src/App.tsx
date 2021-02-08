import React, { useState, useEffect } from "react";
import logo from "./logo.svg";

import "./index.css";
import { colors } from "./colors";

import { Quote } from "./Quote";

function App() {
    const [colorIndex, setColorIndex] = useState(0);

    function handleColorRequestChange() {
        setColorIndex((colorIndex + 1) % colors.length);
    }

    const colorTheme = colors[colorIndex];

    return (
        <div className="App" style={{ backgroundColor: colorTheme }}>
            <Quote
                colorTheme={colorTheme}
                onColorRequestChange={handleColorRequestChange}
            />
        </div>
    );
}

export default App;
