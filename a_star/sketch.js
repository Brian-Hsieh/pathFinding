let width = 500, height = 500;
let rows = 30;
let cols = 30;
let grids;
let gridWidth = width / cols;
let gridHeight = height / rows;
let start, end;
let obstaclePoss = 0.3;

let openSet = new MinHeap();
let closedSet = [];
let path = [];

function Cell(i,j){
	this.i = i;
	this.j = j;
	this.f = Infinity;
	this.g = Infinity;
	this.h = 0;
	this.neighbors = [];
	this.previous = undefined;
	this.obstacle = false;

	if(Math.random() < obstaclePoss) this.obstacle = true;

	this.show = function(col){
		fill(col);
		if(this.obstacle){
			fill(0);
		}
		noStroke();
		rect(this.i * gridWidth, this.j * gridHeight, gridWidth-1, gridHeight-1);
	}

	this.getNeighbors = function(){
		if(this.neighbors.length > 0){
			return this.neighbors;
		}else{
			//construct neighbors list
			if(this.i > 0) this.neighbors.push(grids[i-1][j]);
			if(this.i < cols-1) this.neighbors.push(grids[i+1][j]);
			if(this.j > 0) this.neighbors.push(grids[i][j-1]);
			if(this.j < rows-1) this.neighbors.push(grids[i][j+1]);
			return this.neighbors;
		}
	}

	this.setH = function(end){
		this.h = pow(this.i - end.i, 2) + pow(this.j - end.j, 2);
	}
}

function generateRandomIndex(limit){
	return Math.floor(Math.random() * (limit));
}

function removeCell(cell, set){
	for(let i = set.length -1 ; i >= 0; i--){
		if(cell == set[i]){
			set.splice(i, 1);
		}
	}
}

function reconstructPath(cell){
	let cur = cell;
	while(cur){
		path.push(cur);
		cur = cur.previous;
	}
}

function setup() {
	createCanvas(width, height);

	//construct 2d array
	grids = new Array(cols);
	for(let i = 0; i < cols; i++){
		grids[i] = new Array(rows);
	}

	//assign cell to grid
	for(let i = 0; i< cols; i++){
		for(let j = 0; j< rows; j++){
			grids[i][j] = new Cell(i,j);
		}
	}

	//set starting and end point
	start = grids[0][0];
	start.g = 0;
	start.f = start.h;
	end = grids[cols-1][rows-1];
	start.obstacle = false;
	end.obstacle = false;

	//set heuristic score
	for(let i = 0; i< cols; i++){
		for(let j = 0; j< rows; j++){
			grids[i][j].setH(end);
		}
	}

	openSet.insert(start);
}

function draw() {

	background(0);

	let current;
	if(openSet.getLength() > 0){
		//continue
		current = openSet.extract();
		if(current === end){
			//construct path
			reconstructPath(current, path);
			console.log("DONE!");
			noLoop();
		}
		closedSet.push(current);

		let neighbors = current.getNeighbors();
		neighbors.forEach(neighbor => {
			if(!closedSet.includes(neighbor)){
				let tempScore = current.g + 1; //cost from current to neighbor set to one
				if(tempScore < neighbor.g){
					neighbor.g = tempScore;
					neighbor.f = neighbor.g + neighbor.h;
					neighbor.previous = current;
					if(!openSet.includeCell(neighbor) && !neighbor.obstacle){
						openSet.insert(neighbor);
					}
				}
			}
		})
	}else{
		//no solution
		console.log("Cannot reach destination...");
		noLoop();
	}

	//update cells
	grids.forEach(colArray =>{
		colArray.forEach(grid => {
			grid.show(color(255));
		})
	})

	openSet.getData().forEach(cell => {
		cell.show(color(0,255,0));
	})

	closedSet.forEach(cell => {
		cell.show(color(255,0,0));
	})

	path = [];
	reconstructPath(current);

	path.forEach(cell => {
		cell.show(color(150,150,150));
	})

}