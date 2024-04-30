const container = document.querySelector("#container")

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function RGBToHSL(r, g, b) {
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    // Calculate hue
    // No difference
    if (delta == 0)
        h = 0;
    // Red is max
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
        h = (b - r) / delta + 2;
    // Blue is max
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;

    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return "hsl(" + h + "," + s + "%," + (l - 10) + "%)";
}

function createGrid(count = 16) {
    for (let col = 0; col < count; col++) {
        const column = document.createElement("div");
        column.classList.toggle("column");

        for (let row = 0; row < count; row++) {
            const square = document.createElement("div");
            square.classList.toggle("square");
            square.addEventListener("mouseover", () => {
                if (square.getAttribute("style")) {
                    let styleText = square.getAttribute("style")
                    styleText = styleText.replace("background-color: rgb(", "").replace(");", "").split(", ")

                    square.style.backgroundColor = RGBToHSL(...styleText)

                } else {
                    square.style.backgroundColor = `hsl(${getRndInteger(0, 360)}, 100%, 90%)`
                }
            })
            column.appendChild(square);
        }

        container.append(column)
    }


}

function removeGrid() {
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }
}

const button = document.querySelector("#clear");
button.addEventListener("click", () => {
    removeGrid();
    createGrid();
})

const button2 = document.querySelector("#new-length");
button2.addEventListener("click", () => {
    const size = parseInt(prompt("Enter size:")) || 16
    removeGrid();
    createGrid(size);
})

createGrid();