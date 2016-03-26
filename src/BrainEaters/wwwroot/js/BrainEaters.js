var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
window.onload = function () {
    var spriteSize = 32;
    var canvas = document.getElementById("gameSpace");
    // ReSharper disable once AssignedValueIsNeverUsed
    var context = canvas.getContext("2d");
    var canvasWidth = canvas.offsetWidth;
    var canvasHeight = canvas.offsetHeight;
    var numCol = Math.floor(canvasWidth / spriteSize); //20
    var numRow = Math.floor(canvasHeight / spriteSize); //15
    //console.log(numCol);
    //console.log(numRow);
    var gameArr = []; //why const?
    for (var i = 0; i < numRow; i++) {
        gameArr[i] = [];
    }
    var GameObj = (function () {
        function GameObj(posRow, posCol, isSolid, src) {
            var _this = this;
            if (src === void 0) { src = "../images/bg_tile.png"; }
            this.posRow = posRow;
            this.posCol = posCol;
            this.isSolid = isSolid;
            this.gameObjImg = new Image();
            this.gameObjImg.onload = function () {
                context.drawImage(_this.gameObjImg, posCol * spriteSize, posRow * spriteSize, spriteSize, spriteSize);
            };
            this.gameObjImg.src = src;
        }
        return GameObj;
    }());
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player() {
            _super.call(this, 1, (Math.floor(Math.random() * (numCol - 2) + 1)), true, "../images/plSprite.png");
        }
        Player.prototype.mov = function () { };
        return Player;
    }(GameObj));
    var Zombie = (function (_super) {
        __extends(Zombie, _super);
        function Zombie(varRow) {
            _super.call(this, varRow, (Math.floor(Math.random() * (numCol - 2) + 1)), true, "../images/zomSprite.png");
        }
        Zombie.prototype.mov = function () {
            // ReSharper disable TsNotResolved
            if (true /*changelater*/) {
                this.posCol = Math.floor(Math.random() + 1);
            }
            this.posRow = Math.floor(Math.random() + 1);
            // ReSharper restore TsNotResolved
        };
        return Zombie;
    }(GameObj));
    populateGame();
    console.log(gameArr);
    // ReSharper disable VariableCanBeMadeConst
    // ReSharper disable UnusedLocals
    var player = new Player();
    var zomRow;
    do {
        zomRow = Math.floor(Math.random() * (numRow - 6) + 5);
    } while (zomRow % 2 === 0);
    var zombie0 = new Zombie(zomRow);
    do {
        zomRow = Math.floor(Math.random() * (numRow - 6) + 5);
    } while (zomRow % 2 === 0);
    var zombie1 = new Zombie(zomRow);
    function populateGame() {
        for (var row = 0; row < numRow; row++) {
            var numEmptyMax = Math.floor(Math.random() * 2 + 4);
            //console.log(numEmptyMax);
            var numEmpty = 0; //why move inside?
            for (var col = 0; col < numCol; col++) {
                //gameArr[row][col] = 0;
                if (row === 0 || row === numRow - 1) {
                    gameArr[row][col] = new GameObj(row, col, true);
                }
                else if (col === 0 || col === numCol - 1) {
                    gameArr[row][col] = new GameObj(row, col, true);
                }
                else if (row % 2 !== 0) {
                    gameArr[row][col] = -9;
                }
                else {
                    var coin = Math.floor(Math.random() * 10);
                    if (coin <= 2 && numEmpty < numEmptyMax) {
                        gameArr[row][col] = -9;
                        ++numEmpty;
                    }
                    else {
                        gameArr[row][col] = new GameObj(row, col, true);
                    }
                }
            }
        }
    }
};
//# sourceMappingURL=BrainEaters.js.map