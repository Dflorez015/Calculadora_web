var table = document.getElementById("table"), rIndex, cIndex; // Tabla e indices de la calculadora
var label = document.getElementById("display"); // Label donde se visualizaran los números y sus resultados
var rec = document.getElementById("historial");// Tabla historial
var memory = [];
var option = "";
var lastOption = "";
var cal = [
    ["%", "CE", "ALLC", "DEL"],
    ["1/x", "x²", "√x", "÷"],
    ["7", "8", "9", "X"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["±", "0", ".", "="]
]

// Ingresa los números escogidos en la tabla y los ingresa al label
const number = (x, y) => {
    if (label.textContent == "0" && x != 5) {
        label.innerHTML = "";
    }
    if (x >= 2 && x <= 4) {
        if (y >= 0 && y <= 2) {
            label.textContent = label.textContent + cal[x][y];
        }
    } else if (x == 5 && y == 1) {
        label.textContent = label.textContent + cal[x][y];
    }
}

// Limpia el historial
const clearApp = () => {
    if (memory.length != 0) {
        $("#historial tr").remove()
        label.innerHTML = "";
        memory = [];
        lastOption = "";
        option = "";
    }
}

// Realiza las primeras dos filas de operaciones. Excepto la división
const conplexOperation = (opcn) => {
    let cont = memory.length
    let numero = parseFloat(memory[cont - 1])
    switch (opcn) {
        case "1/x":
            label.innerHTML = 1 / numero;
            break;

        case "x²":
            label.innerHTML = Math.pow(numero, 2);
            break;

        case "√x":
            label.innerHTML = Math.sqrt(numero);
            break;

        case "%":
            label.innerHTML = parseFloat(numero / 100);
            break;

        case "CE":
            label.innerHTML = "";
            break;

        case "ALLC":
            clearApp();
            break;

        case "DEL":
            label.innerHTML = memory.pop().slice(0, -1);
            break;

        case "±":
            label.innerHTML = numero * -1;
            memory.shift();
            break;

        case ".":
            if (label.textContent.indexOf(opcn) == -1) {
                label.textContent = label.textContent + ".";
            } memory.shift();
            break;

        default:
            break;
    }
}

// Verifica si la posición de los elementos corresponde con alguna operación
const operation = (x, y) => {
    if (label.textContent != "") {
        if (x <= 1 && cal[x][y] != "÷") {
            memory.push(label.textContent); // guarda el número escogido
            label.innerHTML = "";
            conplexOperation(cal[x][y]);
        } else if (x != 5 && y == 3) {
            memory.push(label.textContent);
            label.innerHTML = "";
            option = cal[x][y]; // graba la operación escogida
        } else if (x == 5 && y != 1 && y != 3) {
            memory.push(label.textContent);
            if (y != 2) { label.innerHTML = ""; }
            conplexOperation(cal[x][y]);
        }
    }
}

const basicOperation = (optn, numero1, numero2) => {
    switch (optn) {
        case "÷":
            label.innerHTML = numero1 / numero2 || "0";
            break;
        case "X":
            label.innerHTML = numero1 * numero2 || "0";
            break;
        case "-":
            label.innerHTML = numero1 - numero2 || "0";
            break;
        case "+":
            label.innerHTML = numero1 + numero2 || "0";
            break;

        default:
            break;
    }
}

// Historial de la aplicación
const record = (optn, n1, n2) => {
    // Inserta una fila en la tabla
    var newRow = rec.insertRow(rec.rows.length);

    // Inserta una celda en la fila, en el índice 0
    var newCell = newRow.insertCell(0);

    let respuesta = label.textContent;

    // Añade un nodo de texto a la celda
    var newText = document.createTextNode(`${n1} ${optn} ${n2} = ${respuesta}`);
    newCell.appendChild(newText);
}

// Ejecuta una operación básica si se escogió una
const equal = (x, y) => {
    if (option != "") {
        lastOption = option;;
        memory.push(label.textContent);
        let cont = memory.length;
        let numero1 = parseFloat(memory[cont - 2]) || 0;
        let numero2 = parseFloat(memory[cont - 1]) || 0;
        basicOperation(option, numero1, numero2);
        record(option, numero1, numero2);
        option = "";
    } else {
        if (lastOption != "" && memory.length >= 2) {
            let cont = memory.length;
            let numero1 = parseFloat(label.textContent) || 0;
            let numero2 = parseFloat(memory[cont - 1]) || 0;
            basicOperation(lastOption, numero1, numero2);
            record(lastOption, numero1, numero2);
        }
    }
}


const allOperaciones = () => {
    number(rIndex, cIndex);
    operation(rIndex, cIndex);
    if (rIndex == 5 && cIndex == 3) {
        equal(rIndex, cIndex);
    }
}

// table rows
for (var i = 0; i < table.rows.length; i++) {
    // row cells
    for (var j = 0; j < table.rows[i].cells.length; j++) {
        // función click
        table.rows[i].cells[j].onclick = function () {
            rIndex = this.parentElement.rowIndex; // Coge el elemento en x
            cIndex = this.cellIndex; // Coge el elemento en y
            allOperaciones(); // función madre de todas las operaciones
        };
    }
}

