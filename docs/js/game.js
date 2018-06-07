/// <reference path="dev/snake.ts"/>
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
