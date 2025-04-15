# Compares the shortest path for a 2D maze search with AStar Algorithm vs. Reinforcement Learing
# Takes the size of the maze and number of obstacles as command line arguments
# Running in the scritpt from command line: pytthon maze_solver grid_size num_ostacles
# As an example, for a 20x20 grid with 30 obstacles, run python maze_solver 20 30

# https://github.com/d1skidder/maze-solver-astar-vs-rl/blob/main/maze_solver.py

import random
import heapq
import copy
import time
import sys

#Fucntion to create grid of given size and number of obstacles
def make_grid(size, numObstacles):
    grid = []
    for i in range(size):
        row = []
        for j in range(size):
            row.append(' ')
        grid.append(row)

    grid[0][0] = 'S'
    grid[size-1][size-1] = 'E'

    obstaclesPlaced = 0
    while obstaclesPlaced < numObstacles:
        x = random.randint(0, size - 1)
        y = random.randint(0, size - 1)
        if grid[x][y] == ' ':
            grid[x][y] = 'X'
            obstaclesPlaced += 1

    return grid


#Function to print the grid
def printGrid(grid):
    for row in grid:
        print(' '.join(row))
    print('\n')

#Initialize rewards, polity and values for all cells
def init_vars(grid):

    size = len(grid)

    # Set rewards based on grid values
    rewards = []
    for i in range(size):
        row = []
        for j in range(size):
            row.append(1)
        rewards.append(row)

    for i in range(size):
        for j in range(size):
            if grid[i][j] == 'X':
                rewards[i][j] = -100
            elif grid[i][j] == 'E':
                rewards[i][j] = 100
            elif grid[i][j] == 'S':
                rewards[i][j] = 0

    # Initialize policy to UP for all states
    policy = []
    for i in range(size):
        row = []
        for j in range(size):
            row.append('D')
        policy.append(row)


    # Initialize value to 0 for all states
    values = []
    for i in range(size):
        row = []
        for j in range(size):
            row.append(0)
        values.append(row)

    return rewards, policy, values

#Policy update
def update_policy(policy, values, rewards, gamma):
    action = ['U', 'D', 'L', 'R']
    min_int = -99999

    for i in range(len(values)):
        for j in range(len(values[0])):
            value_update = [min_int, min_int, min_int, min_int]
            for a in action:
              if a == 'U':
                  i_ = i - 1
                  j_ = j
                  if i_ >= 0 and j_ >= 0 and i_ < len(values) and j_ < len(values[0]):
                      value_update[0] = rewards[i_][j_] + gamma*values[i_][j_]
              elif a == 'D':
                  i_ = i + 1
                  j_ = j
                  if i_ >= 0 and j_ >= 0 and i_ < len(values) and j_ < len(values[0]):
                      value_update[1] = rewards[i_][j_] + gamma*values[i_][j_]
              elif a == 'L':
                  i_ = i
                  j_ = j - 1
                  if i_ >= 0 and j_ >= 0 and i_ < len(values) and j_ < len(values[0]):
                      value_update[2] = rewards[i_][j_] + gamma*values[i_][j_]
              elif a == 'R':
                  i_ = i
                  j_ = j + 1
                  if i_ >= 0 and j_ >= 0 and i_ < len(values) and j_ < len(values[0]):
                      value_update[3] = rewards[i_][j_] + gamma*values[i_][j_]
              values[i][j] = max(value_update)
              policy[i][j] = action[value_update.index(max(value_update))]

    return policy, values

#Reinforcement learning iteration
def reinforcement(rewards, policy, values, gamma):
    iter = 1
    while True:
        current_policy = copy.deepcopy(policy)
        #Uncomment to print the intermediate policies
        #print('Iteration:', iter)
        #printGrid(current_policy)
        policy, values = update_policy(policy, values, rewards, gamma)
        done = True
        iter += 1
        for i in range(len(policy)):
            for j in range(len(policy[0])):
                if policy[i][j] != current_policy[i][j]:
                    done = False
                    break
        if done:
            break


    return policy, values

# manhattan huerisitc for estimation
def manhattan(a, b):
    return abs(a[0] - b[0]) + abs(a[1] - b[1])

# AStar iteration
def astar(grid, start, end):
    size = len(grid)
    openSet = [(0, start)]
    cameFrom = {}
    gScore = {start: 0} # cost from start to this node, starts at 0
    fScore = {start: manhattan(start, end)} #estimated total cost through this node manhatten huerisitci because we are not using diagonals MAKE SURE TO USE UACLIDIDIAN IF YOU SWITCH TO DIAGONALS

    while openSet: # run while nodes exist
        openSet.sort()  # sort by fscore
        current = openSet.pop(0)[1] #take lowest fscore node to try first this is bueaty of astar

        if current == end: # have we found the end?
            path = []
            while current in cameFrom: # we have found the end so lets trace back to construct path with the reverse
                path.append(current)
                current = cameFrom[current]
            path.reverse()
            return path

        neighbors = [(0, 1), (1, 0), (0, -1), (-1, 0)] # neihbors up down left right no diagonals update here if change
        for neighbor in neighbors: #test all dirs
            x = current[0] + neighbor[0] # cords after move
            y = current[1] + neighbor[1]
            if (0 <= x < size and 0 <= y < size): # do not leave the grid
                if (grid[x][y] != 'X'): # can we move here?
                    tentative_gScore = gScore[current] + 1 #cost update tentative
                    if (x, y) not in gScore or tentative_gScore < gScore[(x, y)]:
                        cameFrom[(x, y)] = current
                        gScore[(x, y)] = tentative_gScore # good path update g
                        fScore[(x, y)] = tentative_gScore + manhattan((x, y), end) # good path update f
                        openSet.append((fScore[(x, y)], (x, y))) # add to open set

    return [] # no path is possible so we will just return it empty


if __name__ == "__main__":
    #Set up the maze with obstacles
    size = int(sys.argv[1])
    numObstacles = int(sys.argv[2])
    grid = make_grid(size, numObstacles)
    print(f"\nGrid of size {size:d}X{size:d} with {numObstacles:d} obstacles\n")
    printGrid(grid)

    #Define start and end ponts
    start = (0, 0)
    end = (size-1, size-1)

    #Find shortest path using AStar algorithm
    print("Computing lowest cost path using AStar algorithm...\n")
    tic = time.perf_counter()
    path = astar(grid, start, end)
    toc = time.perf_counter()


    #Trace the shortest path and print it
    grid_w_path = copy.deepcopy(grid)
    for step in path:
        if grid_w_path[step[0]][step[1]] != 'S' and grid_w_path[step[0]][step[1]] != 'E':
            grid_w_path[step[0]][step[1]] = '-'
    printGrid(grid_w_path)
    print("Length of path computed by AStar:", len(path))
    print(f"Completed AStar in {toc - tic:0.4f} seconds\n")

    #Find shortest path using Reinforcement learning
    print("Computing lowest cost path using Reinforcement Learning...\n")
    rewards, policy, values = init_vars(grid)
    #discount factor
    gamma = 0.99
    tic = time.perf_counter()
    policy, values = reinforcement(rewards, policy, values, gamma)
    toc = time.perf_counter()

    print('Final Policy:')
    printGrid(policy)

    #Print path computed through Reinforcement Learning
    grid_w_path = copy.deepcopy(grid)
    i, j = 0, 0
    pathlen = 0
    while True:
        if grid[i][j] == 'E' or grid[i][j] == 'X':
            break
        else:
            if policy[i][j] == 'U':
                i -= 1
            elif policy[i][j] == 'D':
                i += 1
            elif policy[i][j] == 'L':
                j -= 1
            elif policy[i][j] == 'R':
                j += 1
            if grid_w_path[i][j] != 'E':
                grid_w_path[i][j] = '-'
            pathlen += 1

    print('Path based on final policy:')
    printGrid(grid_w_path)
    print("Length of path computed by Reinforcement Learning:", pathlen)
    print(f"Completed RL in {toc - tic:0.4f} seconds\n")
