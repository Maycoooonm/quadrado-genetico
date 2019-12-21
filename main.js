let size = {x:500, y:500};
let maxMoves = 80;
let goal;
let player;
let newPlayer;
let population;
let idx = 0;
let drawPopulation = false; 
function setup() {
	createCanvas(size.x, size.y);
	background(100);
	goal = new Goal(size.x/2, 10, 30);
	player = new Player(0, size.y, 20);
	newPlayer = new Player(0, size.y, 20);
	population = new Population(40, 0.02, player, goal, maxMoves, drawPopulation);

}
function draw() {
	background(100);
	goal.draw();
	if(population.done) {
		frameRate(10);
		if(idx == 150) return noLoop();
		let currentMove = population.best.genes[idx];
		newPlayer.draw()
		newPlayer.move(currentMove);
		idx++;
	} else {
		population.naturalSelection();
		population.reproduce();
	console.log(`Geracao ${population.generation} - melhor ${population.best.calculeteFitness()}`);
	}
}
class Goal {
	constructor(x, y, size) {
		this.x = x;
		this.y = y;
		this.size = size;
	}
	draw() {
		fill(color(255, 0, 0))
		rect(this.x, this.y, this.size, this.size )
	}
}
class Player {
	constructor(x, y, size) {
		this.x = x;
		this.originalX = x;
		this.y = y;
		this.originalY = y;
		this.size = size;
		this.color = color(255, 255, 255)
	}
	setColor(rgb) {
		this.color = color(rgb);
	}
	draw() {
		fill(this.color)
		rect(this.x, this.y, this.size, this.size)
	}
	move(direction) {
		if(direction == "UP") return this.y -= 10;
		if(direction == "DOWN") return this.y += 10;
		if(direction == "RIGHT") return this.x += 10;
		if(direction == "LEFT") return this.x -= 10;
	}
	reset() {
		this.x = this.originalX;
		this.y = this.originalY;
	}
	isWin(goal) {
		if(this.x+this.size > goal.x && this.x < goal.x+goal.size && this.y+this.size > goal.y && this.y < goal.y+goal.size)  return true;
		return false;
	}
}