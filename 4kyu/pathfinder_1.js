function updateDistance(Point, maze) {
  Point.toEnd = maze.length - Point.x + maze[0].length - Point.y
}

class Point {
  constructor(x, y) {
  this.x = x
  this.y = y
  this.ratio = 0
  this.stepsDone = 0
  this.toEnd = 0
  this.neighbours = []
  this.parent = undefined
  }

  updateDistance(maze) {
    this.toEnd = maze.length - 1 - this.x + maze[0].length - 1 - this.y
  }

  addNeighbours(allPoints) {
    let currI = this.x
    let currJ = this.y
    if (currI > 0)
      this.neighbours.push(allPoints[currI- 1][currJ])
    if (currJ > 0)
      this.neighbours.push(allPoints[currI][currJ - 1])
    if (currI + 1 < allPoints.length)
      this.neighbours.push(allPoints[currI+ 1][currJ])
    if (currJ + 1 < allPoints[currI].length)
      this.neighbours.push(allPoints[currI][currJ + 1])
  }
}

function initAllPoints(maze) {
  res = new Array(maze.length)
  for (i = 0; i < maze.length; i++) {
    res[i] = new Array(maze[i].length)
    for (j = 0; j < res[i].length; j++) {
      res[i][j] = new Point(i, j)
    }
  }
  for (i = 0; i < maze.length; i++) {
    for (j = 0; j < res[i].length; j++) {
      res[i][j].addNeighbours(res)
      res[i][j].updateDistance(maze)
    }
  }
  return res
}

function pathFinder(maze){
  maze = maze.split('\n')
  let allPoints = initAllPoints(maze)
  return true;
}

function testMaze(expected, maze){
  let actual = pathFinder(maze);
  console.log(expected === actual)
}

testMaze(true,
`.W.
.W.
...`);

// testMaze(false,
// `.W.
// .W.
// W..`);

// testMaze(true,
// `......
// ......
// ......
// ......
// ......
// ......`);

// testMaze(false,
// `......
// ......
// ......
// ......
// .....W
// ....W.`);
