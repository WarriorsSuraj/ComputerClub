/*
README:

CURRENTLY BROKEN!

theta* is an any-angle pathfinding algorithm based on a*.
best overall for when you aren't restricted to horizontal/diagonal movements.

*/

/*
function theta*(start, goal)
    // This main loop is the same as A*
    gScore(start) := 0
    parent(start) := start
    // Initializing open and closed sets. The open set is initialized 
    // with the start node and an initial cost
    open := {}
    open.insert(start, gScore(start) + heuristic(start))
    // gScore(node) is the current shortest distance from the start node to node
    // heuristic(node) is the estimated distance of node from the goal node
    // there are many options for the heuristic such as Euclidean or Manhattan 
    closed := {}
    while open is not empty
        s := open.pop()
        if s = goal
            return reconstruct_path(s)
        closed.push(s)
        for each neighbor of s
        // Loop through each immediate neighbor of s
            if neighbor not in closed
                if neighbor not in open
                    // Initialize values for neighbor if it is 
                    // not already in the open list
                    gScore(neighbor) := infinity
                    parent(neighbor) := Null
                update_vertex(s, neighbor)
    return Null
            
    
function update_vertex(s, neighbor)
    // This part of the algorithm is the main difference between A* and Theta*
    if line_of_sight(parent(s), neighbor)
        // If there is line-of-sight between parent(s) and neighbor
        // then ignore s and use the path from parent(s) to neighbor 
        if gScore(parent(s)) + c(parent(s), neighbor) < gScore(neighbor)
            // c(s, neighbor) is the Euclidean distance from s to neighbor
            gScore(neighbor) := gScore(parent(s)) + c(parent(s), neighbor)
            parent(neighbor) := parent(s)
            if neighbor in open
                open.remove(neighbor)
            open.insert(neighbor, gScore(neighbor) + heuristic(neighbor))
    else
        // If the length of the path from start to s and from s to 
        // neighbor is shorter than the shortest currently known distance
        // from start to neighbor, then update node with the new distance
        if gScore(s) + c(s, neighbor) < gScore(neighbor)
            gScore(neighbor) := gScore(s) + c(s, neighbor)
            parent(neighbor) := s
            if neighbor in open
                open.remove(neighbor)
            open.insert(neighbor, gScore(neighbor) + heuristic(neighbor))

function reconstruct_path(s)
    total_path = {s}
    // This will recursively reconstruct the path from the goal node 
    // until the start node is reached
    if parent(s) != s
        total_path.push(reconstruct_path(parent(s)))
    else
        return total_path

lineOfSight(node1, node2) {
  let x0 = node1.x;
  let y0 = node1.y;
  let x1 = node2.x;
  let y1 = node2.y;
  let dx = abs(x1 - x0);
  let dy = -abs(y1 - y0);

  let sX = -1;
  let sY = -1;
  if(x0 < x1) {
    sX = 1;
  }
  if(y0 < y1) {
    sY = 1;
  }

  let e = dx + dy;
  while(true) {
    let point = getNode(x0, y0);
    if(point does not exist OR point is not walkable) {
      return false;
    }
    if(x0 == x1 AND y0 == y1) {
      return true;
    }
    let e2 = 2 * e;
    if(e2 >= dy) {
      if(x0 == x1) {
        return true;
      }
      e += dy;
      x0 += sX;
    }
    if(e2 <= dx) {
      if(y0 == y1) {
        return true;
      }
      e += dx;
      y0 += sY;
    }
  }
}
*/

class Node {
    constructor(x, y, g, f, h) {
        this.x = x;
        this.y = y;
        this.g = g || 0;
        this.f = f || 0;
        this.h = h || Number.POSITIVE_INFINITY;

        this.parent = null;
        this.neighbors = [];

        this.obstacle = false;
    }

    initNeighbors(nodes) {
        // assuming we are working with 8 directional gridspace

        this.neighbors.push(getnode(this.x - 1, this.y, nodes));
        this.neighbors.push(getnode(this.x, this.y - 1, nodes));
        this.neighbors.push(getnode(this.x + 1, this.y, nodes));
        this.neighbors.push(getnode(this.x, this.y + 1, nodes));
        this.neighbors.push(getnode(this.x - 1, this.y - 1, nodes));
        this.neighbors.push(getnode(this.x - 1, this.y + 1, nodes));
        this.neighbors.push(getnode(this.x + 1, this.y - 1, nodes));
        this.neighbors.push(getnode(this.x + 1, this.y + 1, nodes));

        this.neighbors.filter((neighbor) => neighbor !== null && neighbor !== undefined && !neighbor.obstacle);
    }
}

// using minheap for efficient data structuring
/*
README:

insert: O(log n)
extractMin: O(log n)
getMin: O(1)
heapify: O(log n)
build heap: O(n)

*/

class MinHeap {
    constructor(comparator, capacity) {
        this.array = [];
        this.size = this.array.length;

        // optional:
        this.capacity = capacity;
        this.comparator = comparator || ((a, b) => a - b);
    }

    parent(index) {
        return ~~((index - 1) / 2);
    }

    leftChild(index) {
        return 2 * index + 1;
    }

    rightChild(index) {
        return 2 * index + 2;
    }

    swap(a, b) {
        [this.array[a], this.array[b]] = [this.array[b], this.array[a]];
    }

    // restructure heap so smallest at top
    heapify(index) {
        let smallest = index;
        const left = this.leftChild(smallest);
        const right = this.rightChild(smallest);

        if(left < this.size && this.comparator(this.array[left], this.array[smallest]) < 0) {
            smallest = left;
        }

        if(right < this.size && this.comparator(this.array[right], this.array[smallest]) < 0) {
            smallest = right;
        }

        if(smallest !== index) {
            this.swap(index, smallest);
            this.heapify(smallest);
        }
    }

    insert(value) {
        if(this.size >= (this.capacity || Number.POSITIVE_INFINITY)) {
            throw new Error("HEAP IS FULL");
        }

        this.array[this.size] = value;
        this.size = this.array.length;

        let current = this.size - 1;
        const parent = this.parent(current);
        while(current > 0 && this.comparator(this.array[current], this.array[parent]) < 0) {
            this.swap(current, parent);
            current = parent;
        }
    }

    get Min() {
        return this.array[0];
    }

    fixHeap() {
        if(!this.array.length) return;

        this.array[0] = this.array[this.size - 1];
        this.size = this.array.length;

        //this.array.pop();
        this.heapify(0);

        return true;
    }

    removeMin() {
        const min = this.array[0];
        this.array.shift();
        this.fixHeap();

        return min;
    }
    
    // builds a heap from an array
    buildHeap(array, size, hasCapacity) {
        this.array = array;
        this.size = size;
        
        if(hasCapacity) this.capacity = this.size;

        for(let i = ~~((this.size / 2) - 1); i >= 0; i--) {
            this.heapify(i);
        }
    }

    has(item) {
        return this.array.includes(item);
    }

    hasStuff() {
        return this.array.length > 0;
    }
}

function thetastar(start, end, nodes) {
    start.g = 0;
    start.parent = start;
    start.f = start.g + heuristic(start, end);

    const openList = new MinHeap((a, b) => a.f - b.f);
    openList.insert(start);

    const closedList = [];

    while (openList.hasStuff()) {
        /* IMPORTANT:
        implement a data structure (e.g. minheap) below instead of sorting each time.
        */

        const node = openList.removeMin();

        if (node.x === end.x && node.y === end.y) return reconstructpath(node);

        closedList.push(node);

        for (let i = 0; i < node.neighbors.length; i++) {
            const neighbor = node.neighbors[i];

            if (!neighbor) continue;

            const inClosedList = closedList.find(closedNode => closedNode.x === neighbor.x && closedNode.y === neighbor.y);
            //if (!inClosedList) {
                if (!openList.includes(neighbor)) {
                    neighbor.g = Number.POSITIVE_INFINITY;
                    neighbor.parent = null;
                }

                updatevertex(node, neighbor, openList, end, nodes);
            //}
        }
    }

    return [];
}

// returns the cost for traversing
function c(a, b) {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function heuristic(node, end) {
    return Math.hypot(end.y - node.y, end.x - node.x);
}

function updatevertex(node, neighbor, openList, end, nodes) {
    // this part of the algorithm is the main difference between a* and theta*

    if (lineofsight(node.parent, neighbor, nodes)) {
        if (node.parent.g + c(node.parent, neighbor) < neighbor.g) {
            neighbor.g = node.parent.g + c(node.parent, neighbor);
            neighbor.parent = node.parent;

            if (openList.find((node) => node.x === neighbor.x && node.y === neighbor.y)) {
                openList.splice(0, openList.findIndex(node => node.x === neighbor.x && node.y === neighbor.y));
            }

            neighbor.f = neighbor.g + heuristic(neighbor, end);
            openList.push(neighbor);
        }
    } else {
        if (node.g + c(node, neighbor) < neighbor.g) {
            neighbor.g = node.g + c(node, neighbor);
            neighbor.parent = node;
            neighbor.f = neighbor.g + heuristic(neighbor, end);

            /*
            if (openList.find((node) => node.x === neighbor.x && node.y === neighbor.y)) {
                openList.splice(0, openList.findIndex(node => node.x === neighbor.x && node.y === neighbor.y));
            }
            openList.push(neighbor);*/

            if(!openList.includes(neighbor)) {
                openList.insert(neighbor);
            } else openList.buildHeap(openList.array, openList.array.length);
        }
    }
}

function reconstructpath(node) {
    const path = [];
    let current = node;

    while (current.parent !== current) {
        path.push(current);
        current = current.parent;
    }

    path.push(current);

    return path.reverse();
}

// basic getnode implementation, there are WAY better ways to do this
function getnode(x, y, nodes) {
    return nodes.find((node) => node.x === x && node.y === y);
}

function lineofsight(a, b, nodes) {
    let x0 = a.x;
    let y0 = a.y;
    const x1 = b.x;
    const y1 = b.y;
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);

    let sX = -1;
    let sY = -1;

    if (x0 < x1) {
        sX = 1;
    }
    if (y0 < y1) {
        sY = 1;
    }

    let e = dx + dy;
    while (true) {
        const point = getnode(x0, y0, nodes);

        if (!point || point?.obstacle) return false;

        // prevent corner clipping, check if neighbors are obstacles too
        for(const neighbor of point.neighbors) {
            if(neighbor?.obstacle) return false;
        }

        if (x0 === x1 && y0 === y1) return true;

        const e2 = e * 2;
        if (e2 >= dy) {
            if (x0 === x1) return true;

            e += dy;
            x0 += sX;
        }

        if (e2 <= dx) {
            if (y0 === y1) return true;

            e += dx;
            y0 += sY;
        }
    }
}
