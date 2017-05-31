// start slingin' some d3 here.
//d3.selectAll('div').data([1,2,3,4,5,6,7,8,9,10,11]).enter().append('div').attr('id', function(d) {return d});

var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 30,
  padding: 20
};

var gameBoard = function() {
  d3.select('.board').append('svg:svg')
  .attr('width', gameOptions.width)
  .attr('height', gameOptions.height);
};

gameBoard();

var svg = d3.select('svg');

var rangeIt = num => {
  let arr = [];
  for (let i = 0; i <= num; i++) {
    arr.push(new Enemy(i));// 700, 450));
  }
  return arr;
};

class Dot {
  constructor(boardWidth = 700, boardHeight = 450) {
    this.boardDimensions = {w: boardWidth, h: boardHeight};
  }
  setPosition() {
    this.x = Math.floor(Math.random() * this.boardDimensions.w);
    this.y = Math.floor(Math.random() * this.boardDimensions.h);
    return this;
  }
}

class Enemy extends Dot {
  constructor(id) {
    super();
    this.id = id;
  }
}
var enemiesData = rangeIt(40);

var enemies = svg.selectAll('circle.enemy')
            .data(enemiesData, (d) => d.id);
enemies.enter()
    .append('svg:circle')
      .attr('class', 'enemy')
      .attr('cx', enemy => enemy.setPosition.call(enemy).x)
      .attr('cy', enemy => enemy.y)
      .attr('r', 10);

var move = () => {
  enemies.transition().duration([2000])
    .style('cx', enemy => enemy.setPosition.call(enemy).x)
    .style('cy', enemy => enemy.y);
};

move();

setInterval(move, 2000);

class Playa extends Dot {
  constructor(name = 'anonymous') {
    super();
    this.name = name;
  }
}

var Rue = new Playa();
svg.selectAll('circle.playa').data([Rue])
  .enter().append('svg:circle')
  .attr('class', 'playa')
  .attr('cx', playa => playa.boardDimensions.w / 2)
  .attr('cy', playa => playa.boardDimensions.h / 2)
  .attr('r', 10)
  .attr('fill', 'orange')
  .call(d3.behavior.drag()
    .on("drag", dragmove));

function dragmove (d) {
  var x = d3.event.x - 350;
  var y = d3.event.y - 230;
  //debugger;
  d3.select(this).attr('transform', 'translate(' + x + ',' + y + ')');
}

// function dragstarted(d) {
//   d3.select(this).raise().classed("active", true);
// }

// function dragged(d) {
//   d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
// }

// function dragended(d) {
//   d3.select(this).classed("active", false);
// }





