/*-------------------- some variables --------------------*/
// cells
const grid = document.querySelector('.grid');
const cellsCount = 168;
let cells = [];

// figures
const figures = [
/* r */[[0, 1, 12, 24], [0, 1, 2, 14], [1, 13, 24, 25], [0, 12, 13, 14]],
/* t */[[0, 12, 13, 24], [0, 1, 2, 13], [1, 12, 13, 25], [1, 12, 13, 14]],
/* s */[[0, 12, 13, 25], [1, 2, 12, 13]],
/* z */[[1, 12, 13, 24], [0, 1, 13, 14]],
/* o */[[0, 1, 12, 13]]
// it doesn't works correctly
/* - */// [[0, 1, 2, 3], [0, 12, 24, 36], [0, 1, 2, 3], [0, 12, 24, 36]] 
];
let fig = { i: 0, r: 0 };   // current figure index, rotation
let pivot = 4;              // current figure pivot position

// game update
let gameUpdateInterval = 500;
let lastPosition = 0;

// controls
let keyPressed = false;



/*-------------------- some methods --------------------*/
const random = (max) => Math.floor(Math.random() * max);



/*-------------------- game --------------------*/
const update = () => {
    move(12);
    if (lastPosition === pivot && !keyPressed)
        fix();
    else
        lastPosition = pivot;
};
setInterval(update, gameUpdateInterval);



/*-------------------- grid --------------------*/
const createGrid = () => {
    // grid
    for (let i = 0; i < cellsCount; ++i) {
        const divElem = document.createElement('div');
        divElem.textContent = i;
        cells.push(divElem);
        grid.appendChild(divElem);
    }
    // border
    for (let i = 0; i < cellsCount; ++i) {
        if (i === 0 ||
            i === 11 ||
            i > (cellsCount - 12) ||
            (i % 12) === 0 ||
            ((i + 1) % 12) === 0
        )
            cells[i].classList.add('static');
    }
};



/*-------------------- figure --------------------*/
const create = (figure, type = 'active') => {
    figure.forEach(element => {
        cells[pivot + element].classList.add(type);
    });
};

const hasСollision = (offset = 0, collisionObjectType = 'static') => {
    return figures[fig.i][fig.r].some(figureCellOffset =>
        cells[pivot + figureCellOffset + offset].classList.contains(collisionObjectType));
};

const draw = () => {
    create(figures[fig.i][fig.r]);
};

const erase = () => {
    figures[fig.i][fig.r].forEach(offset => {
        cells[pivot + offset].classList.remove('active');
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
    fig.r += 1;
    if (fig.r > figures[fig.i].length - 1)
        fig.r = 0;
    draw();
    while (hasСollision()) {
        erase();
        pivot -= 11;
        if (hasСollision())
            pivot -= 2;
        draw();
    }
};

const fix = (figure = figures[fig.i][fig.r]) => {
    erase();
    create(figure, 'static');
    pivot = 4;
    fig.i = random(figures.length);
    fig.r = random(figures[fig.i].length);
    draw();
};



/*-------------------- control --------------------*/
const keyDownHandler = (event) => {
    keyPressed = true;
    const moveDirection = {
        // 'w': -12,  // the player is not allowed to move up (logically)
        // 'ц': -12,
        's': 12,
        'ы': 12,
        'a': -1,
        'ф': -1,
        'd': 1,
        'в': 1
    };
    
    if (event.key === 'Enter')
        fix();
    if (event.key === ' ')
        rotate();
    if (Object.keys(moveDirection).includes(event.key))
        move(moveDirection[event.key]);
};

const keyUpHandler = () => {
    keyPressed = false;
};



/*------------------------------------------------*/
createGrid();
create(figures[fig.i][fig.r]);



window.addEventListener('keydown', keyDownHandler);
window.addEventListener('keyup', keyUpHandler);
