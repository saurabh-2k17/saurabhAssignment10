document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("main");
    const ctx = canvas.getContext("2d");
    const clearButton = document.getElementById("new");
    const eraseButton = document.getElementById("erase");
    const blackButton = document.getElementById("black");
    const pinkButton = document.getElementById("pink");
    const blueButton = document.getElementById("blue");
    const yellowButton = document.getElementById("yellow");
    const slider = document.getElementById("slider");
    const brushSizeDisplay = document.getElementById("brushSize");

    let painting = false;
    let erasing = false;
    let currentColor = "black";
    let brushSize = slider.value;

    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseleave", stopPainting);

    clearButton.addEventListener("click", clearCanvas);
    eraseButton.addEventListener("click", toggleEraser);
    blackButton.addEventListener("click", () => changeColor("black"));
    pinkButton.addEventListener("click", () => changeColor("pink"));
    blueButton.addEventListener("click", () => changeColor("blue"));
    yellowButton.addEventListener("click", () => changeColor("yellow"));
    slider.addEventListener("input", updateBrushSize);

    function startPainting(e) {
        painting = true;
        draw(e);
    }

    function stopPainting() {
        painting = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!painting) return;
        ctx.lineWidth = brushSize;
        ctx.lineCap = "round";
        ctx.strokeStyle = currentColor;

        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function toggleEraser() {
        erasing = !erasing;
        if (erasing) {
            eraseButton.classList.add("active");
            ctx.globalCompositeOperation = "destination-out";
        } else {
            eraseButton.classList.remove("active");
            ctx.globalCompositeOperation = "source-over";
            ctx.strokeStyle = currentColor;
        }
    }

    function changeColor(color) {
        currentColor = color;
        ctx.strokeStyle = color;
        ctx.globalCompositeOperation = "source-over";
        erasing = false;
        eraseButton.classList.remove("active");
    }

    function updateBrushSize() {
        brushSize = slider.value;
        brushSizeDisplay.innerText = brushSize;
    }
});
