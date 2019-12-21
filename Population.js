class Population {
	constructor(size, mutationRate, player, goal, maxMoves, drawPopulation) {
		this.size = size;
		this.mutationRate = mutationRate;
		this.player = player;
		this.population = [];
		this.goal = goal;
		this.done = false;
		this.maxMoves = maxMoves;
		for(let i = 0; i < this.size; i++) {
			this.population[i] = new DNA(player, goal, maxMoves, drawPopulation);
		}
		this.matingPool = [];
		this.best = this.population[0];
		this.bestFitness = 0;
		this.generation = 0;
	}
	naturalSelection() {
		if(this.done) return console.log("acabou");
		this.matingPool = [];
		for(let i = 0; i < this.population.length; i++) {
			if(this.population[i].calculeteFitness(this.best) > this.bestFitness) {
				// bruh
				if(this.population[i].calculeteFitness() >= 10000) {
					this.best = this.population[i];
					this.done = true;
				}
				this.best = this.population[i];
				this.bestFitness = this.population[i].calculeteFitness();
			}
		}
		let newArr = [] 
		for(let i=0;i<this.population.length;i++) {	
			let n = map(this.population[i].calculeteFitness(),0,this.bestFitness,0,1);
			n = floor(n*100);
			for(let j=0;j<n;j++) {
				newArr.push(this.population[i])
			}
		}
		this.matingPool = newArr;	
	}
	reproduce() {
		for(let i = 0; i < this.population.length; i++) {
			if(i == 20) return this.population[20] = this.best;
			let n1 = floor(random(this.matingPool.length));
			let n2 = floor(random(this.matingPool.length));
			let mae = this.matingPool[n1];
			let pai = this.matingPool[n2];
			
			let filho = mae.cruzar(pai);
			filho.mutar(this.mutationRate);
			
			this.population[i] = filho;
			this.generation++;
		}
	}	
}