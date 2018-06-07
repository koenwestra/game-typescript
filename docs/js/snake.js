"use strict";
var Game;
(function (Game) {
    const FLOOR = {
        SPACE: 'space',
        BODY: 'body',
        FOOD: 'food'
    };
    class Model {
        constructor(blocks, row, col) {
            this.blocks = blocks;
            this.row = row;
            this.col = col;
            this.offsets = [[-1, 0], [0, -1], [+1, 0], [0, +1]];
        }
        get all() {
            return this.blocks;
        }
        getBlock(pos) {
            return this.blocks.filter((block) => {
                if (block.pos.x === pos.x && block.pos.y === pos.y) {
                    return true;
                }
            })[0];
        }
        sbling(source, direction) {
            return this.blocks.filter((block) => {
                if (source.pos.x + this.offsets[direction][0] === block.pos.x
                    && source.pos.y + this.offsets[direction][1] === block.pos.y) {
                    return true;
                }
            })[0];
        }
        random() {
            let pos = {
                x: Math.floor(Math.random() * this.col),
                y: Math.floor(Math.random() * this.row)
            };
            let block = this.getBlock(pos);
            return block;
        }
        genFood() {
            let block = this.random();
            if (block.type === FLOOR.BODY) {
                block = this.random();
            }
            block.type = FLOOR.FOOD;
            this.render([block]);
        }
        render(blocks) {
            blocks.forEach(block => {
                block.node.className = block.type;
            });
        }
    }
    class Floor {
        constructor(options) {
            options = options || {};
            this.table = document.createElement('table');
            this.table.cellPadding = '0';
            this.table.cellSpacing = '0';
            this.parent = options.parent || document.body;
            this.row = options.row || 20;
            this.col = options.col || 20;
            this.blocks = [];
        }
        get model() {
            return new Model(this.blocks, this.row, this.col);
        }
        initialize() {
            let y;
            let x;
            for (y = 0; y < this.row; y++) {
                let tr = this.table.insertRow(-1);
                for (x = 0; x < this.col; x++) {
                    let td = tr.insertCell(-1);
                    td.className = FLOOR.SPACE;
                    this.blocks.push({
                        node: td,
                        type: FLOOR.SPACE,
                        pos: { x: x, y: y }
                    });
                }
            }
            this.parent.appendChild(this.table);
        }
    }
    Game.Floor = Floor;
    class Snake {
        constructor(floor, options) {
            options = options || {};
            this.model = floor.model;
            this.initLength = options.initLength || 3;
            this.direction = 2;
            this.bodies = [];
            this.speed = options.speed || 300;
            this.timer = null;
            this.score = 0;
            this.step = 0;
        }
        born() {
            var lastStep;
            var lastKeyCode;
            var setDirectionTimer;
            let setDirection = (keyCode) => {
                switch (keyCode) {
                    case 37:
                        if (this.direction !== 2) {
                            this.direction = 0;
                        }
                        break;
                    case 38:
                        if (this.direction !== 3) {
                            this.direction = 1;
                        }
                        break;
                    case 39:
                        if (this.direction !== 0) {
                            this.direction = 2;
                        }
                        break;
                    case 40:
                        if (this.direction !== 1) {
                            this.direction = 3;
                        }
                        break;
                }
            };
            let keyHandler = (e) => {
                const keyCode = e.keyCode || e.which || e.charCode;
                e.preventDefault();
                if (setDirectionTimer) {
                    clearTimeout(setDirectionTimer);
                }
                if (this.step === lastStep) {
                    lastKeyCode = keyCode;
                    setDirectionTimer = setTimeout(function () {
                        setDirection(lastKeyCode);
                    }.bind(this), this.speed);
                    return;
                }
                setDirection(keyCode);
                lastStep = this.step;
            };
            document.addEventListener('keydown', keyHandler, false);
            for (let i = this.initLength - 1; i >= 0; i--) {
                this.bodies.push(this.model.all[i]);
            }
            this.bodies.forEach(body => {
                body.type = FLOOR.BODY;
            });
            this.model.render(this.bodies);
            this.model.genFood();
            this.timer = setInterval(function () { this.move(); }.bind(this), this.speed);
        }
        move() {
            let head = this.bodies[0];
            let tail = this.bodies[this.bodies.length - 1];
            let next = this.model.sbling(head, this.direction);
            if (!next || next.type === FLOOR.BODY) {
                this.die();
                return;
            }
            if (next.type === FLOOR.FOOD) {
                this.eat(next);
            }
            for (let i = this.bodies.length - 1; i > 0; i--) {
                this.bodies[i] = this.bodies[i - 1];
            }
            next.type = FLOOR.BODY;
            this.bodies[0] = next;
            tail.type = FLOOR.SPACE;
            this.model.render([tail]);
            this.model.render(this.bodies);
            this.step++;
        }
        die() {
            clearInterval(this.timer);
            alert('Game Over!');
        }
        eat(block) {
            this.bodies.push(block);
            this.model.genFood();
            this.score++;
        }
    }
    Game.Snake = Snake;
})(Game || (Game = {}));
var Game;
(function (Game) {
    const start = document.getElementById('start');
    const score = document.getElementById('score');
    const floor = new Game.Floor({
        parent: document.getElementById('container')
    });
    floor.initialize();
    const snake = new Game.Snake(floor);
    start.onclick = function () {
        snake.born();
        this.setAttribute('disabled', true);
    };
    const observer = (changes) => {
        changes.forEach((change) => {
            if (change.name === 'score') {
                score.textContent = change.object[change.name];
            }
        });
    };
    Object.observe(snake, observer);
})(Game || (Game = {}));
//# sourceMappingURL=snake.js.map