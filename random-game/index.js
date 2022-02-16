/*-------------------- some variables --------------------*/
// cells
const grid = document.querySelector('.grid');
const cellsCount = 168;
let cells = [];

// figures
const figureForms = [
    [[0, 1, 12, 24], [2, 14, 1, 0], [25, 24, 13, 1], [12, 0, 13, 14]],
    [[0, 1, 13, 25], [2, 14, 13, 12], [25, 24, 12, 0], [12, 0, 1, 2]],
    [[0, 12, 13, 24], [2, 1, 13, 0], [25, 13, 12, 1], [12, 13, 1, 14]],
    [[0, 1, 12, 13], [1, 13, 0, 12], [13, 12, 1, 0], [12, 0, 13, 1]],
    [[1, 2, 12, 13], [13, 25, 0, 12], [13, 12, 2, 1], [12, 0, 25, 13]],
    [[0, 1, 13, 14], [1, 13, 12, 24], [14, 13, 1, 0], [24, 12, 13, 1]],
];
const figureTypes = ['circle', 'cross', 'triangle', 'square'];
const figureScore = [5, 10, 25, 100];
let activeFigure = [
    [0, 0],         // offset, type
    [1, 1],
    [12, 2],
    [13, 3]
];
let activeFigureForm = 0;
let activeFigureRotation = 0;
const pivotStartPosition = 4;   // figure pivot position
let pivotPosition = pivotStartPosition;                  


// game
const score = document.querySelector('.score');
let gameUpdateInterval = 500;
let lastPosition = 0;
let difficulty = 2;

// controls
let keyPressed = false;



/*-------------------- some methods --------------------*/
const random = (max) => Math.floor(Math.random() * max);



/*-------------------- game --------------------*/
const update = () => {
    move(12);
    checkCellsWithoutPivotPoint();
    if (lastPosition === pivotPosition && !keyPressed) {
        if (pivotPosition < 36) restart();
        else fix();
    } else {
        lastPosition = pivotPosition;
    }
};

const restart = () => {
    score.textContent = 0;
    clearGrid();
    lastPosition = 0;
    pivotPosition = pivotStartPosition;
    draw();
};

const addScore = (value) => {
    score.textContent = Number(score.textContent) + value;
};



/*-------------------- grid --------------------*/
const createBorder = () => {
    for (let i = 0; i < cellsCount; ++i) {
        if (i === 0 ||
            i === 11 ||
            i > (cellsCount - 12) ||
            (i % 12) === 0 ||
            ((i + 1) % 12) === 0
        )
            cells[i].classList.add('static', 'border');
        
        if (i > 0 && i < 11 ||
            i > 12 && i < 23 ||
            i > 24 && i < 35
            ) 
            cells[i].classList.add('border_top');
    }
};

const createGrid = () => {
    for (let i = 0; i < cellsCount; ++i) {
        const divElem = document.createElement('div');
        divElem.textContent = i;
        cells.push(divElem);
        grid.appendChild(divElem);
    }
    createBorder();
};

const clearGrid = () => {
    cells.forEach((_, i) =>
        cells[i].classList.remove(...cells[i].classList));
    createBorder();
};

///////////////////////////// REFACTOR ME //////////////////////////////
const checkCells = () => {
    let cellsInLine;
    const clear = (i, direction) => {
        cellsInLine = (new Array(3))
            .fill()
            .map((_, offset) =>
                [...cells[i + offset * direction].classList].filter(_class =>
                    figureTypes.includes(_class)))
            .flat(Infinity);
        
        if (cellsInLine.length > 2 &&
            cellsInLine.every(elem => elem === cellsInLine[0])
        ) {
            [0, 1, 2].forEach(offset => {
                cells[i + offset * direction].classList.remove(cellsInLine[0], 'static');
            });
            // circle +5 | cross +10 | triangle +25 | square +100
            const addValue = figureScore[figureTypes.findIndex(item => item === cellsInLine[0])];
            addScore(addValue);
        }
    };

    // checks 3 in a row
    for (let i = 0; i < cellsCount; ++i){
        // →
        if (i > 36 && i < 153 && i % 12 > 0 && i % 12 < 9)
            clear(i, 1); 
        // ↓
        if (i > 36 && i < 131 && i % 12 > 0 && i % 12 < 11)
            clear(i, 12);
        // ↘
        if (i > 36 && i < 129 && i % 12 > 0 && i % 12 < 11)
            clear(i, 13);  
        // ↙
        if (i > 38 && i < 131 && i % 12 > 2 && i % 12 < 11)
            clear(i, 11);
    }
};

/////////////// refactor it later, it works and is good
const checkCellsWithoutPivotPoint = () => {
    let temp; // rename it later
    // left, up, right, down
    const directions = [-1, -12, 1, 12]; 

    // cells to check
    let needToCheck = (new Array(cellsCount)).fill().map((_, i) => i);
    // current group of cells being checked
    let checked = new Set();

    // check all adjoining cells
    const check = (i) => {
        if (checked.has(i))
            return;
        // check all directions
        directions.forEach((direction) => {
            temp = [1].map(() =>
            [...cells[i + direction].classList]
                .filter(_class =>
                    figureTypes.includes(_class)))
                .flat(Infinity);
            if (temp.length > 0) {
                checked.add(i);
                check(i + direction);
            }
        });
        // adds itself if there is no adjacent cell
        checked.add(i);
    };

    //if the cell doesn't have a pivot, then move it down
    const moveCell = (cell) => {
        const cellIndex = needToCheck.findIndex(item => item === cell);
        if (cellIndex !== -1) {
            needToCheck.splice(cellIndex, 1);
            needToCheck.splice(cellIndex + 11, 1);
            let classes = [...cells[cell].classList];
            cells[cell].classList.remove(...cells[cell].classList);
            cells[cell + 12].classList.add(...classes);
        }
    };

    for (let i = cellsCount; i > 0; --i) {
        if (!(i > 36 && i < 143 && i % 12 > 0 && i % 12 < 11)) continue;
        if ([...cells[i].classList].includes('active')) continue;
        if (cells[i].classList.length < 2) continue;
        
        check(i);
        // if not grounded
        if (Array.from(checked).filter(index => index > 144 && index < 155).length === 0)
            checked.forEach((cell) => moveCell(cell));
        checked.clear();
    }
};



/*-------------------- figure --------------------*/
const create = () => {
    activeFigureForm = random(figureForms.length);
    activeFigureRotation = random(4);
    activeFigure.forEach((cell, i) => {
        cell[0] = figureForms[activeFigureForm][activeFigureRotation][i];
        cell[1] = figureTypes[random(difficulty)];
    });
    draw();
};

const hasСollision = (offset = 0, collisionObjectType = 'static') => {
    return activeFigure.some(figureCell =>
        cells[pivotPosition + figureCell[0] + offset].classList.contains(collisionObjectType));
};

const draw = (newClass) => {
    activeFigure.forEach(cell => {
        // redraw active shape
        cells[pivotPosition + cell[0]].classList.add('active', cell[1]);

        // fix
        if (newClass){
            cells[pivotPosition + cell[0]].classList.remove('active');
            cells[pivotPosition + cell[0]].classList.add(newClass);
        } 
    });
};

const erase = () => {
    activeFigure.forEach(offset => {
        if (![...cells[pivotPosition + offset[0]].classList].includes('static'))
            cells[pivotPosition + offset[0]].classList.remove('active', ...figureTypes);
    });
};

const move = (direction) => {
    erase();
    if (!hasСollision(direction))
        pivotPosition += direction;
    draw();
};

const rotate = () => {
    erase();
    activeFigureRotation += 1;
    if (activeFigureRotation > 3)
        activeFigureRotation = 0;
    
    // rotate cells in active figure
    activeFigure.forEach((cell, i) =>
        cell[0] = figureForms[activeFigureForm][activeFigureRotation][i]);
    
    // move pivot while there are collisions
    if (hasСollision()) {
        while (hasСollision()) {
            erase();
            pivotPosition -= 11;
            if (hasСollision())
                pivotPosition -= 2;
            draw();
        }
    }
    else
        draw();
};

const fix = () => {
    erase();
    draw('static');
    checkCells();
    pivotPosition = pivotStartPosition;
    create();
};



/*-------------------- control --------------------*/
const keyDownHandler = (event) => {
    const moveDirection = {
        'w': -12,    // the player is not allowed to move up (logically)
        'ц': -12,
        's': 12,     // down also (temporarily)
        'ы': 12,
        'a': -1,
        'ф': -1,
        'd': 1,
        'в': 1
    };
    
    if (event.key === '1')
        restart();
    if (event.key === 'Enter')
        fix();
    if (event.key === ' ') {
        keyPressed = true;
        rotate();
    }
    if (Object.keys(moveDirection).includes(event.key)) {
        keyPressed = true;
        move(moveDirection[event.key]);
    }
};

const keyUpHandler = () => {
    keyPressed = false;
};



/*------------------------------------------------*/
createGrid();
create();
setInterval(update, gameUpdateInterval);



window.addEventListener('keydown', keyDownHandler);
window.addEventListener('keyup', keyUpHandler);
