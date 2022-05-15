const canvas = document.getElementById("canvas")
let canvasBound = canvas.getBoundingClientRect()

let mouseSigns = []
let ereaserW = 20
const minEreaserW = 20
const maxEreaserW = 100
// for(let i = 0 ; i < 10 ; i++){
//     const mouseSign = document.createElement("div")
//     document.body.appendChild(mouseSign)

//     mouseSign.setAttribute("class","mouse_sign")
//     mouseSigns.push(mouseSign)
// }
mouseSigns = document.querySelectorAll(".mouse_sign")

let mouseSignBound = mouseSigns[0].getBoundingClientRect()


//pen | ereaser
let mode = 'pen'

const modeEls = document.querySelectorAll(".menu > *")
modeEls.forEach(modeEl => {
    modeEl.addEventListener("click", () => {
        modeEls.forEach(modeEl => modeEl.classList.remove("choosed"))
        modeEl.classList.add("choosed")
        mode = modeEl.innerText
    })
})


const currency = 5

window.onload = (() => {
    canvasBound = canvas.getBoundingClientRect()
    canvas.setAttribute("width", canvas.getBoundingClientRect().width)
    canvas.setAttribute("height", canvas.getBoundingClientRect().height)
    boom.strokeStyle = 'cyan'
    boom.lineWidth = 10
    boom.lineCap = 'round'
    boom.lineJoin = 'round'
});

const boom = canvas.getContext('2d')
boom.strokeStyle = 'cyan'
boom.lineWidth = 10
boom.lineCap = 'round'
boom.lineJoin = 'round'

//mouse
canvas.addEventListener("mousemove", (ev) => overDraw(ev.x - canvasBound.x, ev.y - canvasBound.y))
canvas.addEventListener("mouseleave", (ev) => leaveDraw(ev.x - canvasBound.x, ev.y - canvasBound.y))

canvas.addEventListener("mousedown", (ev) => startDraw(ev.x - canvasBound.x, ev.y - canvasBound.y))
canvas.addEventListener("mousemove", (ev) => draw(ev.x - canvasBound.x, ev.y - canvasBound.y))
canvas.addEventListener("mouseup", (ev) => endDraw(ev.x - canvasBound.x, ev.y - canvasBound.y))

//touch
canvas.addEventListener("touchmove", (ev) => overDraw(ev.touches[0].pageX - canvasBound.x, ev.touches[0].pageY - canvasBound.y))
canvas.addEventListener("touchend", (ev) => leaveDraw(0, 0))

canvas.addEventListener("touchstart", (ev) => startDraw(ev.touches[0].pageX - canvasBound.x, ev.touches[0].pageY - canvasBound.y))
canvas.addEventListener("touchmove", (ev) => draw(ev.touches[0].pageX - canvasBound.x, ev.touches[0].pageY - canvasBound.y))
canvas.addEventListener("touchend", (ev) => endDraw(0, 0))




let beganDraw = false
let px, py

let px2, py2
let pW
function overDraw(x, y) {
    switch (mode) {
        case 'ereaser':
            setMouseSignW(Math.sqrt((px2 - x) ** 2 + (py2 - y) ** 2) * 3)
            mouseSignBound = mouseSigns[0].getBoundingClientRect()
            //mouseSign.style.left = `${x- mouseSignBound.width/2 + canvasBound.x}px`
            //mouseSign.style.top = `${y- mouseSignBound.height/2 + canvasBound.y}px`
            setMouseSignPos(x - mouseSignBound.width / 2 + canvasBound.x, y - mouseSignBound.height / 2 + canvasBound.y)
            break
        case 'pen':
            break
    }
    [px2, py2] = [x, y]
}

function setMouseSignPos(x, y) {
    mouseSigns.forEach(el => { el.style.left = x + "px"; el.style.top = y + "px"; })
}

function setMouseSignW(w) {
    if (Math.abs(pW - w) < 20) return
    if (w < minEreaserW || maxEreaserW < w) return
    ereaserW = w
    mouseSigns.forEach(el => el.style.setProperty("--w", w + "px"))
    //mouseSigns[0].style.setProperty("--w",w+"px")
    pW = w
}

function leaveDraw(x, y) {
    switch (mode) {
        case 'ereaser':
            break
        case 'pen':
            break
    }

    setMouseSignPos(0, 0)
}


function startDraw(x, y) {
    switch (mode) {
        case 'ereaser':
            break
        case 'pen':
            boom.beginPath()
            boom.moveTo(x, y)
            break
    }
    beganDraw = true
}
function draw(x, y) {
    if (!beganDraw) return
    if (Math.sqrt((x - px) ** 2 + (y - py) ** 2) < currency) return

    switch (mode) {
        case 'ereaser':
            boom.fillStyle = '';
            boom.globalCompositeOperation = 'destination-out';
            boom.beginPath()
            boom.arc(x, y, ereaserW / 2, 0, 2 * Math.PI, true)
            boom.fill();
            boom.fillStyle = 'none';
            boom.globalCompositeOperation = 'source-over';
            break
        case 'pen':
            boom.lineTo(x, y)
            boom.stroke()
            break
    }
    px = x
    py = y
}
function endDraw(x, y) {
    switch (mode) {
        case 'ereaser':

            break
        case 'pen':
            boom.stroke()
            break
    }

    beganDraw = false
    px = x
    py = y
}

function clear() {
    boom.context.clearRect(0, 0, canvasBound.width, canvasBound.height);
}