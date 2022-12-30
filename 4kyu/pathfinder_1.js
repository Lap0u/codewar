function updateDistance(Point, maze) {
  Point.toEnd = maze.length - Point.x + maze[0].length - Point.y
}

class Point {
  constructor(x, y, value) {
  this.x = x
  this.y = y
  this.value = value
  this.ratio = 0
  this.stepsDone = 0
  this.toEnd = 0
  this.children = []
  this.parent = undefined
  }

  updateDistance(maze) {
    this.toEnd = maze.length - 1 - this.x + maze[0].length - 1 - this.y
  }

  addChildren(allPoints) {
    let currI = this.x
    let currJ = this.y
    if (this.value === 'W')
      return
    if (currI > 0 && allPoints[currI- 1][currJ].value !== 'W')
      this.children.push(allPoints[currI- 1][currJ])
    if (currJ > 0 && allPoints[currI][currJ - 1].value !== 'W')
      this.children.push(allPoints[currI][currJ - 1])
    if (currI + 1 < allPoints.length && allPoints[currI+ 1][currJ].value !== 'W')
      this.children.push(allPoints[currI+ 1][currJ])
    if (currJ + 1 < allPoints[currI].length && allPoints[currI][currJ + 1].value !== 'W')
      this.children.push(allPoints[currI][currJ + 1])
  }
}

function initAllPoints(maze) {
  res = new Array(maze.length)
  for (i = 0; i < maze.length; i++) {
    res[i] = new Array(maze[i].length)
    for (j = 0; j < res[i].length; j++) {
      res[i][j] = new Point(i, j, maze[i][j])
    }
  }
  for (i = 0; i < maze.length; i++) {
    for (j = 0; j < res[i].length; j++) {
      res[i][j].addChildren(res)
      res[i][j].updateDistance(maze)
    }
  }
  return res
}

function findNextBest(currentPoint) {
  while (currentPoint.children.length === 0) {
    currentPoint = currentPoint.parent
    if(currentPoint === undefined)
      return false
  }
  lowPoint = currentPoint.children[0]
  for (i = 0; i < currentPoint.children.length; i++) {
    if (currentPoint.children[i].toEnd < lowPoint.toEnd && currentPoint.children[i].children.length !== 0)
      lowPoint = currentPoint.children[i]
  }
  console.log('low', lowPoint);
  return lowPoint
}

function removeChildren(currentPoint, nextPoint) {
  //remove children from parents
  
  ind = currentPoint.children.indexOf(nextPoint)
  currentPoint.children.splice(ind, 1)

  //remove parents from childrens' children
  index = nextPoint.children.indexOf(currentPoint)
  nextPoint.children.splice(index, 1)
}

function startSearch(allPoints, maze) {
  mazeWidth = maze[0].length
  mazeHeight = maze.length
  current = allPoints[0][0]
  while (current !== allPoints[mazeHeight -1][mazeWidth - 1]) {
      next = findNextBest(current)
      // console.log(('nn', next));
      if (typeof next === "boolean") {
        console.log("End", next)
        return next
      }
      next.stepsDone = current.stepsDone + 1
      next.parent = current
      removeChildren(current, next)
      current = next
      if (current.x === 2 || current.y === 2)
      {
        console.log('fon', current);
        return false
      }
      // return false
  }
  return true
}

function pathFinder(maze){
  maze = maze.split('\n')
  let allPoints = initAllPoints(maze)
  return startSearch(allPoints, maze)
}

function testMaze(expected, maze){
  let actual = pathFinder(maze);
  console.log(expected === actual)
}

// testMaze(true,
// `.W.
// .W.
// ...`);

testMaze(false,
`...
.W.
W..`);

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
