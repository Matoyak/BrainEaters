window.onload = () => {
    const spriteSize = 32;
    const canvas = document.getElementById("gameSpace") as HTMLCanvasElement;
    // ReSharper disable once AssignedValueIsNeverUsed
    const context = canvas.getContext("2d");
    const canvasWidth = canvas.offsetWidth;
    const canvasHeight = canvas.offsetHeight;
    const numCol = Math.floor(canvasWidth / spriteSize); //20
    const numRow = Math.floor(canvasHeight / spriteSize); //15

    //console.log(numCol);
    //console.log(numRow);

    const gameArr = []; //why const?
    for (let i = 0; i < numRow; i++) {
        gameArr[i] = [];
    }

    class GameObj {
        gameObjImg: HTMLImageElement;

        constructor(protected posRow: number,
            protected posCol: number,
            protected isSolid: boolean,
            src: string = "../images/bg_tile.png") {
            this.gameObjImg = new Image();
            this.gameObjImg.onload = () => {
                context.drawImage(this.gameObjImg, posCol * spriteSize, posRow * spriteSize, spriteSize, spriteSize);
            };
            this.gameObjImg.src = src;
        }
    }

    class Player extends GameObj {

        constructor() { super(1, (Math.floor(Math.random() * (numCol - 2) + 1)), true, "../images/plSprite.png"); }

        mov() {}
    }

    class Zombie extends GameObj {

        constructor(varRow) {
            super(varRow, (Math.floor(Math.random() * (numCol - 2) + 1)), true, "../images/zomSprite.png");
        }

        mov() {
            // ReSharper disable TsNotResolved
            if (true /*changelater*/) {
                this.posCol = Math.floor(Math.random() + 1);
            }

            this.posRow = Math.floor(Math.random() + 1);
            // ReSharper restore TsNotResolved
        }

    }

    populateGame();
    console.log(gameArr);

    // ReSharper disable VariableCanBeMadeConst
    // ReSharper disable UnusedLocals
    let player = new Player();


    let zomRow: number;
    do {
        zomRow = Math.floor(Math.random() * (numRow - 6) + 5);
    } while (zomRow % 2 === 0)
    let zombie0 = new Zombie(zomRow);
    do {
        zomRow = Math.floor(Math.random() * (numRow - 6) + 5);
    } while (zomRow % 2 === 0)
    let zombie1 = new Zombie(zomRow);

    // ReSharper restore UnusedLocals
    // ReSharper restore VariableCanBeMadeConst

    function populateGame() {
        for (let row = 0; row < numRow; row++) {
            const numEmptyMax = Math.floor(Math.random() * 2 + 4);
            //console.log(numEmptyMax);
            // ReSharper disable once VariableCanBeMovedToInnerBlock
            let numEmpty = 0; //why move inside?
            for (let col = 0; col < numCol; col++) {
                //gameArr[row][col] = 0;
                if (row === 0 || row === numRow - 1) {
                    gameArr[row][col] = new GameObj(row, col, true);
                } else if (col === 0 || col === numCol - 1) {
                    gameArr[row][col] = new GameObj(row, col, true);
                } else if (row % 2 !== 0) {
                    gameArr[row][col] = -9;
                } else {
                    const coin = Math.floor(Math.random() * 10);
                    if (coin <= 2 && numEmpty < numEmptyMax) {
                        gameArr[row][col] = -9;
                        ++numEmpty;
                    } else {
                        gameArr[row][col] = new GameObj(row, col, true);
                    }
                }
            }
        }
    }
}
