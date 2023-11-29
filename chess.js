class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(item) {
    this.items.push(item);
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

function isValidMove(x, y, grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  return x >= 0 && x < rows && y >= 0 && y < cols && grid[x][y] !== 0;
}

function findMeetingPoint(grid, bishopPos, horsePos) {
  const horseMoves = [
    { dx: -2, dy: -1 },
    { dx: -2, dy: 1 },
    { dx: -1, dy: -2 },
    { dx: -1, dy: 2 },
    { dx: 1, dy: -2 },
    { dx: 1, dy: 2 },
    { dx: 2, dy: -1 },
    { dx: 2, dy: 1 },
  ];

  const bishopMoves = [
    { dx: -1, dy: -1 },
    { dx: -1, dy: 1 },
    { dx: 1, dy: -1 },
    { dx: 1, dy: 1 },
  ];

  const rows = grid.length;
  const cols = grid[0].length;

  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const queue = new Queue();

  queue.enqueue(bishopPos);
  visited[bishopPos[0]][bishopPos[1]] = true;

  while (!queue.isEmpty()) {
    const currentPos = queue.dequeue();

    for (const move of bishopMoves) {
      const newX = currentPos[0] + move.dx;
      const newY = currentPos[1] + move.dy;

      if (isValidMove(newX, newY, grid) && !visited[newX][newY]) {
        queue.enqueue([newX, newY]);
        visited[newX][newY] = true;

        for (const horseMove of horseMoves) {
          const horseX = horsePos[0] + horseMove.dx;
          const horseY = horsePos[1] + horseMove.dy;

          if (horseX === newX && horseY === newY && isValidMove(horseX, horseY, grid)) {
            return [newX, newY];
          }
        }
      }
    }
  }

  return null; 
}


const grid = [
  [1, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
];

const bishopPos = [3, 2];
const horsePos = [6, 6];

const meetingPoint = findMeetingPoint(grid, bishopPos, horsePos);

console.log('Meeting point:', meetingPoint);
