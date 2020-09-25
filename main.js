var table = document.getElementById("table"), rIndex, cIndex;
var label = document.getElementById("display");
var memory = []
var option = ""
var cal = [
    ["%", "CE", "C", "DEL"],
    ["1/x", "x²", "√x", "÷"],
    ["7", "8", "9", "X"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["±", "0", ".", "="]
]

const number = (x, y) => {
    if (label.textContent == "0") {
        label.innerHTML = ""
    }
    if (x >= 2 && x <= 4) {
        if (y >= 0 && y <= 2) {
            label.textContent = label.textContent + cal[x][y]
        }
    } else if (x == 5 && y == 1) {
        label.textContent = label.textContent + cal[x][y]
    }
}

const operacion_compleja = (opcn) => {
    let cont = memory.length
    let numero = parseFloat(memory[cont - 1])
    switch (opcn) {
        case "1/x":
            label.innerHTML = 1 / numero
            break;

        case "x²":
            label.innerHTML = Math.pow(numero, 2)
            break;

        case "√x":
            label.innerHTML = Math.sqrt(numero)
            break;

        case "%":
            label.innerHTML = parseFloat(numero / 100)
            break;

        case "CE":
            label.innerHTML = ""
            memory.pop()
            break;

        case "C":
            label.innerHTML = ""
            memory = []
            break;

        case "DEL":
            label.innerHTML = memory.pop().slice(0, -1)
            break;

        case "±":
            label.innerHTML = numero * -1
            memory.shift()
            break;

        case ".":
            if (label.textContent.indexOf(opcn) == -1) {
                label.textContent = label.textContent + "."
            }memory.shift()
            break;

        default:
            break;
    }
}

const operacion = (x, y) => {
    if (label.textContent != "") {
        if (x <= 1 && cal[x][y] != "÷"){
            memory.push(label.textContent)
            label.innerHTML = ""
            operacion_compleja(cal[x][y])
        } else if (x != 5 && y == 3) {
            memory.push(label.textContent)
            label.innerHTML = ""
            option = cal[x][y]
        } else if (x == 5 && y != 1 && y != 3) {
            memory.push(label.textContent)
            if (y != 2) { label.innerHTML = "" }
            operacion_compleja(cal[x][y])
        }
    }
}

const igual = (x, y) => {
    if (option != "") {
        if (x == 5 && y == 3) {
            memory.push(label.textContent)
            let cont = memory.length
            let numero1 = parseFloat(memory[cont - 2])
            let numero2 = parseFloat(memory[cont - 1])
            switch (option) {
                case "÷":
                    label.innerHTML = numero1 / numero2
                    break;
                case "X":
                    label.innerHTML = numero1 * numero2
                    break;
                case "-":
                    label.innerHTML = numero1 - numero2
                    break;
                case "+":
                    label.innerHTML = numero1 + numero2
                    break;

                default:
                    break;
            }option = ""
        }
    }
}

const mediador = () => {
    number(rIndex, cIndex)
    operacion(rIndex, cIndex)
    igual(rIndex, cIndex)
}

// table rows
for (var i = 0; i < table.rows.length; i++) {
    // row cells
    for (var j = 0; j < table.rows[i].cells.length; j++) {
        table.rows[i].cells[j].onclick = function () {
            rIndex = this.parentElement.rowIndex;
            cIndex = this.cellIndex;
            mediador()
        };
    }
}

