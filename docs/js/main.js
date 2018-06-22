var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Game = (function () {
    function Game(s) {
        this.teacher = [];
        this.page = s;
        this.timer = new Timer();
        this.score = new Score();
        for (var i = 0; i < 100; i++) {
            this.teacher.push(new Teacher(this.score));
        }
        this.sound = new Howl({
            src: ['./sounds/theme-song.mp3'],
            autoplay: true,
            loop: true
        });
        this.sound.play();
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        for (var _i = 0, _a = this.teacher; _i < _a.length; _i++) {
            var b = _a[_i];
            b.update();
        }
        this.timer.update();
        this.score.update();
        if (this.timer.finished == true) {
            this.sound.stop();
            this.page.showEndScreen();
        }
        else {
            requestAnimationFrame(function () { return _this.gameLoop(); });
        }
    };
    return Game;
}());
var GameObject = (function () {
    function GameObject(s) {
        this.page = s;
        this.div = document.createElement("start");
        var container = document.getElementsByTagName("game")[0];
        container.appendChild(this.div);
    }
    GameObject.prototype.update = function () {
    };
    return GameObject;
}());
var Gameover = (function (_super) {
    __extends(Gameover, _super);
    function Gameover(s) {
        var _this = _super.call(this, s) || this;
        _this.div.addEventListener("click", function () { return _this.Clicked(); });
        _this.div.innerHTML = "Play again";
        return _this;
    }
    Gameover.prototype.update = function () {
    };
    Gameover.prototype.Clicked = function () {
        this.page.showPlayScreen();
    };
    return Gameover;
}(GameObject));
var Pages = (function () {
    function Pages() {
        console.log("ik ben een screens instance");
        this.background = document.createElement("background");
        document.body.appendChild(this.background);
        this.container = document.createElement("game");
        document.body.appendChild(this.container);
        this.page = new Start(this);
    }
    Pages.prototype.showPlayScreen = function () {
        this.container.innerHTML = "";
        this.page = new Game(this);
    };
    Pages.prototype.showEndScreen = function () {
        this.container.innerHTML = "";
        this.page = new Gameover(this);
    };
    return Pages;
}());
window.addEventListener("load", function () {
    console.log("create new screens");
    new Pages();
});
var Score = (function () {
    function Score() {
        this.score = 0;
        this.scoreview = document.createElement("score");
        document.body.appendChild(this.scoreview);
        var container = document.getElementsByTagName("game")[0];
        container.appendChild(this.scoreview);
    }
    Score.prototype.update = function () {
        this.scoreview.innerHTML = "Score: " + this.score;
    };
    Score.prototype.addScore = function (n) {
        this.score += n;
    };
    return Score;
}());
var Start = (function (_super) {
    __extends(Start, _super);
    function Start(s) {
        var _this = this;
        console.log("IK BEN EEN STARTtt SCREEN");
        _this = _super.call(this, s) || this;
        _this.div.addEventListener("click", function () { return _this.startClicked(); });
        _this.div.innerHTML = "START";
        return _this;
    }
    Start.prototype.update = function () {
    };
    Start.prototype.startClicked = function () {
        this.page.showPlayScreen();
    };
    return Start;
}(GameObject));
var Teacher = (function () {
    function Teacher(s) {
        var _this = this;
        this.explode = false;
        this.score = s;
        this.sound = new Howl({
            src: ['./sounds/explosion.mp3']
        });
        this.teacher = document.createElement("teacher");
        document.body.appendChild(this.teacher);
        var container = document.getElementsByTagName("game")[0];
        container.appendChild(this.teacher);
        this.x = Math.random() * window.innerWidth - 40;
        this.y = window.innerHeight + Math.random();
        this.speedX = 0;
        this.speedY = Math.random() * -7;
        var randomNumber3 = Math.random() * 360;
        this.teacher.style.filter = "hue-rotate(" + randomNumber3 + "deg)";
        this.teacher.addEventListener("click", function () { return _this.explodeTeacher(); });
    }
    Teacher.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        this.teacher.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
        if (this.y < -100) {
            this.y = 708;
        }
    };
    Teacher.prototype.explodeTeacher = function () {
        if (this.explode == false) {
            this.score.addScore(10);
            this.sound.play();
        }
        this.explode = true;
        this.teacher.classList.add("exploded");
        this.speedY = 2;
        if (this.speedY++) {
            console.log("Omlaag");
        }
        if (this.y++) {
            console.log("Lower");
        }
    };
    return Teacher;
}());
var Timer = (function () {
    function Timer() {
        this.secondes = 3000;
        this.posX = 0;
        this.posY = 0;
        this.finished = false;
        this.clock = document.createElement("clock");
        document.body.appendChild(this.clock);
        this.clock.innerHTML = "Time: 500";
        var container = document.getElementsByTagName("game")[0];
        container.appendChild(this.clock);
        this.posX = (innerWidth / 2) - 150;
        this.clock.style.transform = "translate(" + this.posX + "px, " + this.posY + "px)";
    }
    Timer.prototype.update = function () {
        this.clock.innerHTML = "Tijd " + Math.floor(this.secondes / 50);
        if (this.secondes > 0) {
            this.secondes--;
        }
        else {
            this.finished = true;
        }
    };
    return Timer;
}());
//# sourceMappingURL=main.js.map