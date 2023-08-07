import { useState } from "react";

export const useColorSwitcher = () => {

    const [colorState, setColorState] = useState("");
    const validColors = ['1', '2', '3', '5', '6', '7'];

    const switchColor = () => {
        const randomColor = validColors[Math.floor(Math.random() * validColors.length)];
        setColorState(randomColor);
    }

    return {colorState, switchColor};

}
