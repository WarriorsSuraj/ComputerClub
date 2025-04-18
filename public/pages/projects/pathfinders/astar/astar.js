/* README:

this is basically an implementation of a-star with weights.
if you don't need/want any weighting factors, set to 1.

*/

/*
function AnytimeWeightedAStar(start, goal, h, w)
    // Initialize open and closed lists
    openList := empty priority queue
    closedList := empty set
    
    // Initialize start node
    startNode.g := 0
    startNode.h := h(start)
    startNode.f := startNode.g + startNode.h
    startNode.parent := null
    
    // Add start node to open list
    add startNode to openList
    
    // Loop until open list is empty
    while openList is not empty
        // Get the node with the lowest f value
        currentNode := node with the lowest f value in openList
        remove currentNode from openList
        
        // Check if goal is reached
        if currentNode is goal
            return reconstructPath(currentNode)
        
        // Add current node to closed list
        add currentNode to closedList
        
        // Generate children of currentNode
        for each child of currentNode
            if child is in closedList
                continue
            
            // Calculate g, h, and f values for child
            child.g := currentNode.g + distance(currentNode, child)
            child.h := h(child)
            child.f := child.g + child.h
            
            // If child is not in open list, add it
            if child is not in openList
                add child to openList
                child.parent := currentNode
            else if child is in openList and child.g is less than the current g value in openList
                update child's parent to currentNode
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

function weightedastar(start, end, weight, nodes) {
    const openList = []; // as said in the pseudocode, use priority queue if performance matters
    const closedList = []; // using a Set would result in O(1) time for removal rather then O(n)

    start.g = 0;
    start.h = heuristic(start, end);
    start.f = start.g + weight * start.h;
    start.parent = null;

    openList.push(start);

    while (openList.length) {
        const node = openList.sort((a, b) => a.f - b.f).shift();

        if(node.x === end.x && node.y === end.y) return reconstructpath(node);

        closedList.push(node);

        for(const child of node) {
            if(closedList.find((n) => n.x === child.x && n.y === child.y)) continue;

            child.g = node.g + heuristic(node, child);
            child.h = heuristic(child, end);
            child.f = child.g + weight * child.h;

            if(!openList.find((n) => n.x === child.x && n.y === child.y)) {
                openList.push(child);
                child.parent = node;
            } else if (openList.find((n) => n.x === child.x && n.y === child.y) !== null && child.g < node.g) {
                child.parent = node;
            }
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

function heuristic(node, end) {
    return Math.hypot(end.y - node.y, end.x - node.x);
}