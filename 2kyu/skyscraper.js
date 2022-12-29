const GRID_SIZE = 6

// function allHorNumber(line) {
//   sample = [1, 2, 3, 4, 5, 6]
//   for (num of line) {
//     ind = sample.indexOf(num)
//     if (ind === -1)
//       return false
//     sample.splice(ind, 1)
//   }
//   if (sample.length !== 0)
//     return false
//   return true
// }

// function visHorLeft(line) {
//   view = 0;
//   highest = 0;
//   for (num of line) {
//     if (num > highest) {
//       view++
//       highest = num
//     }
//   }
//   return view
// }

// function visHorRight(line) {
//   view = 0;
//   highest = 0;
//   for (i = GRID_SIZE - 1; i >= 0; i--) {
//     if (line[i] > highest) {
//       view++
//       highest = line[i]
//     }
//   }
//   return view
// }

// function checkHor(ans, clues) {
//   for (j = 0; j < GRID_SIZE; j++) {
//     if (allHorNumber(ans[j]) === false)
//       return false
//     viewFromLeft = visHorLeft(ans[j])
//     viewFromRight = visHorRight(ans[j])
//     console.log(ans[j], viewFromLeft, viewFromRight)
//     console.log(j + 6, 23 - j)
//     if ((clues[j + 6] !== viewFromRight && clues[j + 6] !== 0) || (clues[29 - j  - 6] !== viewFromLeft && clues[29 - j - 6] !== 0))
//       return false
//   }
//   return true;
// }

// ///////////////VERTICAL

// function allVerNumber(arr, j) {
//   sample = [1, 2, 3, 4, 5, 6]
//   for (i = 0; i < GRID_SIZE; i++) {
//     console.log('rr', arr[i][j])
//     ind = sample.indexOf(arr[i][j])
//     if (ind === -1)
//       return false
//     sample.splice(ind, 1)
//   }
//   console.log('ss', sample)
//   if(sample.length !== 0)
//     return false
//   return true
// }

// function viewTop(ans, j) {
//   views = 0
//   highest = 0
//   for (i = 0; i < GRID_SIZE; i++){
//     if (ans[i][j] > highest) {
//       highest = ans[i][j]
//       views++
//     }
//   }
//   return views
// }

// function viewBot(ans, j) {
//   views = 0
//   highest = 0
//   for (i = GRID_SIZE -1; i >= 0; i--) {
//     if (ans[i][j] > highest) {
//       highest = ans[i][j]
//       views++
//     }
//   }
//   return views
// }

// function checkVer(ans, clues) {
//   for (j = 0; j < GRID_SIZE; j++) {
//     console.log('dead')
//     if (allVerNumber(ans, j) === false)
//       return false
//     console.log('alive')
//     viewFromTop = viewTop(ans, j)
//     viewFromBot = viewBot(ans, j)
//     console.log(ans, j, viewFromTop, viewFromBot)
//     if ((viewFromTop !== clues[j] && clues[j] !== 0) || (viewFromBot !== clues[17 - j] && clues[17 - j] !== 0))
//       return false
//   }
//   return true
// }

// function checkValid(ans, clues) {
//   if (checkHor(ans, clues) === false || checkVer(ans, clues) === false)
//       console.log('mauvaise grille')
    
// }

function removePoss(list, remove) {
  ind = list.indexOf(remove)
  if (ind !== -1)
    list.splice(ind, 1)
  if (list.length === 1)
    list = list[0]
}

function removeRangePoss(list, range) {
  for (j = 0; j < range.length; j++)
    removePoss(list, range[j])
}

function updatePossibilites(ans, i, j, remove) {
  for (k = 0; k < 6; k++) {
    if (Array.isArray(ans[i][k])) {
      removePoss(ans[i][k], remove)
    }
    if (Array.isArray(ans[k][j])) {
      removePoss(ans[k][j], remove)
    }
  }
}

function dispArr(ans) {
  for (i = 0; i < 6; i++)
    console.log(ans[i][0],ans[i][1],ans[i][2],ans[i][3],ans[i][4],ans[i][5])
}

function addLine(i, arr) {
  if (i < 6) {
    for (j = 1; j <= 6; j++) {
      arr[j - 1][i] = j
      updatePossibilites(arr, j - 1, i, j)
    }
  }
  else if (i < 12) {
    arr[i - 6] = line
    for (j = 5; j >= 0; j--){
      arr[i - 6][j] = j + 1
      updatePossibilites(arr, i - 6, j, j + 1)
    }
  }
  else if (i < 18) {
    for (j = 1; j <= 6; j++) {
      arr[j - 1][17 - i] = 7 - j
      updatePossibilites(arr, j - 1, 17 - 1, 7 - j)
    }
  }
  else if (i < 24) {
    line = [1, 2, 3, 4, 5, 6]
    arr[23 - i] = line
    for(j = 0; j < 6; j++) {
      arr[23 - i][j] = j + 1
      updatePossibilites(arr, 23 - i, j, j + 1)
    }
  }
}

function addSix(i, arr) {
  if (i < 6) {
    arr[0][i] = 6
    updatePossibilites(arr, 0, i, 6)
  }
  else if (i < 12){
    arr[i - 6][5] = 6
    updatePossibilites(arr, i - 6, 5, 6)
  }
  else if (i < 18) {
    arr[5][17 - i] = 6
    updatePossibilites(arr, 5, 17 - i, 6)
  }
  else if (i < 24) {
    arr[23 - i][0] = 6
    updatePossibilites(arr, 23 - i, 0, 6)
  }
}

function startingClues(ans, clues) {
  for (i = 0; i < clues.length; i++) {
    if (clues[i] === 1)
      addSix(i, ans)
    else if (clues[i] === 6)
      addLine(i, ans)
  }
}

function fillWithArrays(ans, clues) {
  possibilities = [1, 2, 3, 4, 5, 6]
  for (i = 0; i < GRID_SIZE; i++) {
    for(j = 0; j < GRID_SIZE; j++) {
      ans[i][j] = new Array()
      for (k = 0; k < 6; k++)
        ans[i][j][k] = k + 1
    }
  }
  startingClues(ans, clues)
  dispArr(ans)
}

function handleTwo(ans, i) {
  console.log('two', i)
  if (i < 6) {
    removeRangePoss(ans[0][i], [6])
  }
  else if (i < 12) {
    removeRangePoss(ans[i - 6][5], [6])
  }
  else if (i < 18) {
    removeRangePoss(ans[5][17 - i], [6])
  }
  else if (i < 24) {
    removeRangePoss(ans[23 - i][0], [6])
  }
}

function handleThree(ans, i) {
  console.log('three', i)
  if (i < 6) {
    removeRangePoss(ans[0][i], [5, 6])
    removeRangePoss(ans[1][i], [6])
  }
  else if (i < 12) {
    removeRangePoss(ans[i - 6][5], [5, 6])
    removeRangePoss(ans[i - 6][4], [6])
  }
  else if (i < 18) {
    removeRangePoss(ans[5][17 - i], [5, 6])
    removeRangePoss(ans[4][17 - i], [6])
  }
  else if (i < 24) {
    removeRangePoss(ans[23 - i][0], [5, 6])
    removeRangePoss(ans[23 - i][1], [6])
  }
}

function handleFour(ans, i) {
  console.log('four', i)
  if (i < 6) {
    removeRangePoss(ans[0][i], [4, 5, 6])
    removeRangePoss(ans[1][i], [5, 6])
    removeRangePoss(ans[2][i], [6])
  }
  else if (i < 12) {
    removeRangePoss(ans[i - 6][5], [4, 5, 6])
    removeRangePoss(ans[i - 6][4], [5, 6])
    removeRangePoss(ans[i - 6][3], [6])
  }
  else if (i < 18) {
    removeRangePoss(ans[5][17 - i], [4, 5, 6])
    removeRangePoss(ans[4][17 - i], [5, 6])
    removeRangePoss(ans[3][17 - i], [6])
  }
  else if (i < 24) {
    removeRangePoss(ans[23 - i][0], [4, 5, 6])
    removeRangePoss(ans[23 - i][1], [5, 6])
    removeRangePoss(ans[23 - i][2], [6])
  }
}

function handleFive(ans, i) {
  console.log('five', i)
  if (i < 6) {
    removeRangePoss(ans[0][i], [3, 4, 5, 6])
    removeRangePoss(ans[1][i], [4, 5, 6])
    removeRangePoss(ans[2][i], [5, 6])
    removeRangePoss(ans[3][i], [6])
  }
  else if (i < 12) {
    removeRangePoss(ans[i - 6][5], [3, 4, 5, 6])
    removeRangePoss(ans[i - 6][4], [4, 5, 6])
    removeRangePoss(ans[i - 6][3], [5, 6])
    removeRangePoss(ans[i - 6][2], [6])
  }
  else if (i < 18) {
    removeRangePoss(ans[5][17 - i], [3, 4, 5, 6])
    removeRangePoss(ans[4][17 - i], [4, 5, 6])
    removeRangePoss(ans[3][17 - i], [5, 6])
    removeRangePoss(ans[2][17 - i], [6])
  }
  else if (i < 24) {
    removeRangePoss(ans[23 - i][0], [3, 4, 5, 6])
    removeRangePoss(ans[23 - i][1], [4, 5, 6])
    removeRangePoss(ans[23 - i][2], [5, 6])
    removeRangePoss(ans[23 - i][3], [6])
  }
}

function fillingClues(ans, clues) {
  for (i = 0; i < clues.length; i++) {
    if (clues[i] === 2)
      handleTwo(ans, i)
    else if (clues[i] === 3)
      handleThree(ans, i)
    else if (clues[i] === 4)
      handleFour(ans, i)
    else if (clues[i] === 5)
      handleFive(ans, i)
  }
}

function findHorIndex(elem, line) {
  for (i = 0; i < line.length; i++) {
    if (Array.isArray(line[i])) {
      if (line[i].indexOf(elem) !== -1)
        return i
    }
  }
}

function checkHorizontalOnlyOneSpot(line) {
  count = [0, 0, 0, 0, 0, 0, 0]
  for(i = 0; i < GRID_SIZE; i++) {
    for (j = 0; j < line[i].length; j++)
      count[line[i][j]]++
  }
  for (k = 0; k < count.length; k++) {
    if (count[k] === 1) {
      var jIndex = findHorIndex(k, line)
      line[jIndex] = k
    }
  }
}

function findVerIndex(arr, index, tofind) {
  for (k = 0; k < GRID_SIZE; k++) {
    if (Array.isArray(arr[k][index])) {
      if (arr[k][index].indexOf(tofind) !== -1)
        return k
    }
  }
}

function checkVerticalOnlyOneSpot(arr, index) {
  count = [0, 0, 0, 0, 0, 0, 0]
  for (i = 0; i < GRID_SIZE; i++) {
    for(j = 0; j < arr[i][index].length; j++) {
      count[arr[i][index][j]]++
    }
  }
  for(i = 0; i < count.length; i++) {
    if (count[i] === 1) {
      var jIndex = findVerIndex(arr, index, i)
      arr[jIndex][index] = i 
    }
  }
}

function updateAllPossibilities(ans) {
  //doit update chaque ligne et colonne en fonction des nombres deja presents
}

function checkOnlyOneSpot(ans) {
  console.log('1');
  dispArr(ans)
  for (x = 0; x < GRID_SIZE; x++) {
    checkHorizontalOnlyOneSpot(ans[x])
    checkVerticalOnlyOneSpot(ans, x)
  }
  updateAllPossibilities(ans)
}

function solvePuzzle(clues) {
  ans = [[ 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0]]
  fillWithArrays(ans, clues)
  fillingClues(ans, clues)
  checkOnlyOneSpot(ans)
  checkOnlyOneSpot(ans)
  checkOnlyOneSpot(ans)
  checkOnlyOneSpot(ans)
  checkOnlyOneSpot(ans)
  console.log('last')
  dispArr(ans)
  // checkValid(ans, clues)
  return ans
}

var clues = [ 0, 3, 0, 5, 3, 4, 
              0, 0, 0, 0, 0, 1,
              0, 3, 0, 3, 2, 3,
              3, 2, 0, 3, 1, 0];

var expected = [[ 5, 2, 6, 1, 4, 3 ], 
    [ 6, 4, 3, 2, 5, 1 ], 
    [ 3, 1, 5, 4, 6, 2 ], 
    [ 2, 6, 1, 5, 3, 4 ], 
    [ 4, 3, 2, 6, 1, 5 ], 
    [ 1, 5, 4, 3, 2, 6 ]];

comp = solvePuzzle(clues)

console.log('comp')
dispArr(comp)
console.log('expected')
dispArr(expected)
console.log(JSON.stringify(comp) === JSON.stringify(expected))

