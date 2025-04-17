/*
README:

this is a really old pathfinder i made in 2024, and i believe i have lost the improved versions.
however i think it still works

edit: it probably doesn't
*/

class Tachyon {
    public parent: Tachyon;
    public x: number;
    public y: number;
    public f: number;
    public g: number;
    public h: number;
    public canWalkOver: boolean;

    public neighbours: Tachyon[];

    constructor(parent: Tachyon, x: number, y: number, f: number, g: number, h: number, canWalkOver = true) {
        this.parent = parent;
        this.x = x;
        this.y = y;
        this.f = f;
        this.g = g;
        this.h = h;
        this.canWalkOver = canWalkOver;
    };
};

class PathFinder {
    public notVisited: Tachyon[] = [];
    public visited: Tachyon[] = [];
    public allNodes: Tachyon[] = [];
    public neighbours: Tachyon[] = [];

    public startNode: Tachyon;
    public endNode: Tachyon;
    public currentNode: Tachyon;

    public map: Tachyon[] = [];
    public path: Tachyon[] = [];

    public initObstacles() {
        //for()
        return;
    }

    public initNeighbours() {
        for (const node in this.allNodes) {
            this.allNodes[node].neighbours = [];

            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    if (dx === 0 && dy === 0) continue; // skip self

                    const x = node.x + dx;
                    const y = node.y + dy;
                    if (x >= 0 && x < this.map.length && y >= 0 && y < this.map[0].length) {
                        const neighbour = this.allNodes[`${x},${y}`];
                        if (neighbour) {
                            this.allNodes[node].neighbours.push(neighbour);
                        };
                    };
                };
            };
        };
    };

    public findPath(start, goal) {
        this.startNode.g = 0;

        this.notVisited = [];
        this.visited = [];

        while(this.notVisited.length) {
            this.currentNode = this.notVisited[0];

            for(let i = 0; i < this.notVisited.length; i++) {
                const node: Tachyon = this.notVisited[i];

                if(node.f < this.currentNode.f || (node.f === this.currentNode.f && node.h < this.currentNode.h)) {
                    this.currentNode = node;
                }
            };

            //remove this.currentNode from this.notvisited
            this.visited.push(this.currentNode);

            if(this.currentNode.x === this.endNode.x && this.currentNode.y === this.endNode.y) {
                this.endNode = this.currentNode;

                return this.path;
            };

            for(const neighbour of this.neighbours) {
                if(!neighbour.canWalkOver) continue; //to ignore nodes within obstacles
                // ignore if is within building hitbox

                neighbour.g = (this.currentNode.g + Math.hypot(neighbour.x - this.currentNode.x, neighbour.y - this.currentNode.y));
                neighbour.h = Math.hypot(this.endNode.x - neighbour.x, this.endNode.y - neighbour.y);
                neighbour.f = neighbour.g + neighbour.h;

                if(!this.notVisited.includes(neighbour)) {
                    neighbour.parent = this.currentNode

                    if(!this.notVisited.includes(neighbour)) {
                        this.notVisited.push(neighbour);
                    };
                };
            };
        };
    };
};