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
const figureTypes = ['cross', 'circle', 'triangle', 'square'];
let activeFigure = [
    [0, 0],         // offset, type
    [0, 0],
    [0, 0],
    [0, 0]
];
let activeFigureForm = 0;
let activeFigureRotation = 0;
const pivotStartPosition = 4;   // figure pivot position
let pivot = pivotStartPosition;                  


// game
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
    if (lastPosition === pivot && !keyPressed) {
        if (pivot < 36) restart();
        else fix();
    } else {
        lastPosition = pivot;
    }
};
setInterval(update, gameUpdateInterval);

const restart = () => {
    clearGrid();
    lastPosition = 0;
    pivot = pivotStartPosition;
    draw();
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
            cells[i].classList.add('static');
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
    const clean = (i, direction) => {
        cellsInLine = (new Array(3))
            .fill()
            .map((_, offset) =>
                [...cells[i + offset * direction].classList].filter(_class =>
                    figureTypes.includes(_class)))
            .flat(Infinity);
        
        if (cellsInLine.length > 2 &&
            cellsInLine.every(elem => elem === cellsInLine[0])
        ){
            [0,1,2].forEach(offset =>
                cells[i + offset * direction].classList.remove(cellsInLine[0], 'static'));
        }
    };
    // →
    for (let i = 36; i < 156; ++i){
        if (!(i % 12 < 9)) continue;
        clean(i, 1);  
    }
    // ↓
    for (let i = 36; i < 132; ++i){
        clean(i, 12);
    }
    // ↘
    for (let i = 36; i < 132; ++i){
        if (!(i % 12 < 9)) continue;
        clean(i, 13);  
    }
    // ↙
    for (let i = 39; i < 132; ++i){
        if (!(i % 12 > 9)) continue;
        clean(i, 11);
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
        cells[pivot + figureCell[0] + offset].classList.contains(collisionObjectType));
};

const draw = (newClass) => {
    activeFigure.forEach(cell => {
        cells[pivot + cell[0]].classList.add('active', cell[1]);
        if (newClass)
        {
            cells[pivot + cell[0]].classList.remove('active');
            cells[pivot + cell[0]].classList.add(newClass);
        } 
    });
};

const erase = () => {
    activeFigure.forEach(offset => {
        if ([...cells[pivot + offset[0]].classList].includes('active') &&
            ![...cells[pivot + offset[0]].classList].includes('static')
        )
            cells[pivot + offset[0]].classList.remove('active', ...figureTypes);
    });
};

const move = (direction) => {
    erase();
    if (!hasСollision(direction))
        pivot += direction;
    draw();
};

const rotate = () => {
    erase();
    activeFigureRotation += 1;
    if (activeFigureRotation > 3)
        activeFigureRotation = 0;
    
    activeFigure.forEach((cell, i) =>
        cell[0] = figureForms[activeFigureForm][activeFigureRotation][i]);
    
    draw();
    // bug
    // need not clear the cell with collision
    while (hasСollision()) {
        erase();
        pivot -= 11;
        if (hasСollision())
            pivot -= 2;
        draw();
    }
};

const fix = () => {
    erase();
    draw('static');
    checkCells();
    pivot = pivotStartPosition;
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




window.addEventListener('keydown', keyDownHandler);
window.addEventListener('keyup', keyUpHandler);
