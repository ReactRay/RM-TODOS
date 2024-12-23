

const colorPalette = [
    { backgroundColor: "#D32F2F", color: "#FFFFFF" }, // Firebrick Red with White
    { backgroundColor: "#1976D2", color: "#FFFFFF" }, // Bright Blue with White
    { backgroundColor: "#388E3C", color: "#FFFFFF" }, // Medium Green with White
    { backgroundColor: "#FBC02D", color: "#000000" }, // Bright Yellow with Black
    { backgroundColor: "#8E24AA", color: "#FFFFFF" }, // Purple with White
    { backgroundColor: "#0288D1", color: "#FFFFFF" }, // Deep Sky Blue with White
    { backgroundColor: "#F57C00", color: "#FFFFFF" }, // Orange with White
    { backgroundColor: "#C2185B", color: "#FFFFFF" }, // Pink with White
    { backgroundColor: "#512DA8", color: "#FFFFFF" }, // Deep Purple with White
    { backgroundColor: "#0288D1", color: "#FFFFFF" }  // Sky Blue with White
];



import { updateUserPref, getStyle } from "../store/actions/user.actions.js";

export function Presets() {

    function handleClick(index) {
        updateUserPref(colorPalette[index])
    }



    return (
        <div>

            <h1 style={{ textAlign: 'center' }}>choose a preset if you like 😃</h1>
            <div className="color-flex">
                {colorPalette.map((color, idx) => {
                    return (
                        <div className="color-unit" style={color} key={idx} onClick={() => handleClick(idx)}></div>
                    )
                })}
            </div>
        </div>
    )

}