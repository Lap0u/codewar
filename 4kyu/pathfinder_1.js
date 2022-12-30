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
}

function getMazeLen(maze) {
  x = 0;
  while (maze[x] !== undefined){
    x++
  }
  return x
}

function initAllPoints(maze) {
  mazeLen = getMazeLen(maze)
  console.log(';en', mazeLen)
  res = new Array(mazeLen)
  for (i = 0; i < mazeLen; i++) {
    res[i] = new Array(maze[i].length)
    for (j = 0; j < res[i].length; j++)
      res[i][j] = new Point(i, j)
  }
  return res
}

function pathFinder(maze){
  maze = maze.split('\n')
  var allPoints = initAllPoints(maze)
  console.log(allPoints)
  console.log(maze)
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