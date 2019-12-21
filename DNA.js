class DNA {
	constructor(player, goal, maxMoves, drawPopulation) {
		this.player = player;
		this.goal = goal;
		this.drawPopulation = drawPopulation
		this.genes = [];
		this.MOVES = ['UP', 'DOWN', 'RIGHT', 'LEFT'];
		for(let i = 0; i < maxMoves; i++) {
			this.genes[i] = this.createGenes();
		}
	}
	createGenes() {
		let idx = floor(random(this.MOVES.length))
		return this.MOVES[idx];
	}
	calculeteFitness() {
		let distancia = 0;
		this.genes.forEach(move => {
			//this.player.setColor(211,211,211);
			this.player.move(move);
			if(drawPopulation) this.player.draw();
		})
		distancia = floor(dist(this.player.x, this.player.y, this.goal.x, this.goal.y))+1;
		this.player.reset();
		return ((10/distancia)*1000);
	}
	cruzar(pai) {
		let maeGenes = this.genes;
		let paiGenes = pai.genes;
		let filho = new DNA(this.player, this.goal, this.maxMoves);
		let midpoint = floor(random(maeGenes.length));
		for(let i = 0; i < this.genes.length; i++) {
			if(i >= midpoint) filho.genes[i] = maeGenes[i];
			if(i <= midpoint) filho.genes[i] = paiGenes[i];
		}
		return filho
	}
	mutar(mutationRate) {
		for(let i = 0; i < this.genes.length; i++) {
			if(random(1) < mutationRate) {
				this.genes[i] = random(this.MOVES);
				//console.log('mutado')
			}
		}
	}
}