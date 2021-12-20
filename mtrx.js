class Mtrx {
    static RESET_COLOR = "rgba(0, 0, 0, 0.05)";
    static FILL_COLOR = "rgba(0, 255, 0, 1)";
    static REFRESH_TIMEOUT = 32;

    ctx;

    constructor(canvasId) {
        const canvasElement = document.getElementById(canvasId);
        this.ctx = canvasElement.getContext("2d");

        this.init();
        this.start();
    }

    init() {
        this.resize();
        window.onresize = () => this.resize();
    }

    start() {
        const grid = this.createGrid(350, -(window.innerHeight));
        this.update(grid);
    }

    getRandom(max) {
        return Math.random() * max;
    }

    createGrid(length, max) {
        return Array(length)
            .fill(null)
            .map(() => this.getRandom(max));
    }

    createGlyph() {
        return String.fromCharCode(
            Math.floor(900 + this.getRandom(200))
        );
    }

    nextY(y, limit) {
        return (y > limit + this.getRandom(10000)) ? 0 : y + 10;
    }

    resize() {
        this.ctx.canvas.width = window.innerWidth - 5;
        this.ctx.canvas.height = window.innerHeight - 5;
    };

    update(grid) {
        this.ctx.fillStyle = Mtrx.RESET_COLOR;
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = Mtrx.FILL_COLOR;

        window.setTimeout(() => {
            this.update(grid.map((value, index) => {
                this.ctx.fillText(
                    this.createGlyph(),
                    index * 10,
                    value, 
                    20
                );
                return this.nextY(value, 768);
            }));
        }, Mtrx.REFRESH_TIMEOUT);
    };
}

new Mtrx("mtrx");