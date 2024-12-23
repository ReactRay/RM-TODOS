




import { updateUserPref } from "../store/actions/user.actions.js";

export function Presets() {

    function handleClick(index) {
        updateUserPref(colorPalette[index])
    }
    const colorPalette = [
        { backgroundColor: "#8D0B41", color: "#FFFFFF" }, // Firebrick Red with White
        { backgroundColor: "#4C585B", color: "#FFFFFF" }, // Bright Blue with White
        { backgroundColor: "#86A788", color: "#FFFFFF" }, // Medium Green with White
        { backgroundColor: "#9A7E6F", color: "#000000" }, // Bright Yellow with Black
        { backgroundColor: "#7ED4AD", color: "#FFFFFF" }, // Purple with White
        { backgroundColor: "#0288D1", color: "#FFFFFF" }, // Deep Sky Blue with White
        { backgroundColor: "#F57C00", color: "#FFFFFF" }, // Orange with White
        { backgroundColor: "#89A8B2", color: "#FFFFFF" }, // Pink with White
        { backgroundColor: "#512DA8", color: "#FFFFFF" }, // Deep Purple with White
        { backgroundColor: "#FF748B", color: "#FFFFFF" }  // Sky Blue with White
    ];



    return (
        <div>

            <h1 style={{ textAlign: 'center' }}>i hope your favorite color is here 🥲</h1>
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