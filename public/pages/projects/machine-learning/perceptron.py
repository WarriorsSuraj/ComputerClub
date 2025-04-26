"""
consult my notes for deeper, more interconnected explanation on how this works
"""

import random
import matplotlib.pyplot as plt
from time import sleep

class P:
    def __init__(self):
        self.weights = [random.uniform(-1, 1), random.uniform(-1, 1)]
        
        # percentage of strength to modify weights (1 = 100% (bad))
        self.learning_rate = 0.01

    # activation function
    def sign(self, i):
        if i < 0:
            return -1
        elif i >= 0:
            return 1

    def guess(self, inputs):
        sum = 0

        for i in range(len(self.weights)):
            sum += self.learning_rate * inputs[i] * self.weights[i]

        output = self.sign(sum)
        return output

    def train(self, inputs, target):
        guessed = self.guess(inputs)
        error = target - guessed

        # fine tune our weights
        for i in range(len(self.weights)):
            self.weights[i] += error * inputs[i]
        

    """
    def lossfunc(self, guess, ans, n):
        val = 1/n

        for i in range(n):
            val *= self.errorfunc(guess[i], ans[i]) ** 2
        
        return val
    
    def errorfunc(self, guess, ans):
        return abs(ans - guess) / abs(guess)
    
    def backpropagation():
        might be wrong

        base gradient descent algorithm to modify weights:
        w = w - learning_rate * gradient
        
        w = w - learning_rate * 1/n * 2(self.errorfunc(ans, guess)
        
        
    """

    
    

p = P()
inputs = [-1, 0.5]
guess = p.guess(inputs)
print(guess)

class point:
    def __init__(self):
        self.x = random.uniform(0, 300)
        self.y = random.uniform(0, 300)
        if self.x > self.y:
            self.label = 1
        else:
            self.label = -1

dataset = []
for i in range(100):
    dataset.append(point())

# train our perceptron!!!!!!!!!!!!!!
for j in range(5):
    wrong = 0

    for i in range(len(dataset)):
        point = dataset[i]
        target = point.label
        inputs = [point.x, point.y]

        p.train(inputs, target)

        guess = p.guess(inputs)

        if guess == target:
            print(f"guessed right!! point: {point} guess: {guess} target: {target}")
        else:
            print(f"got wrong!!! point: {point} guess: {guess} target: {target}")
            wrong += 1
                
    print(f"error rate: {((wrong / len(dataset)) * 100):.2f}")
    sleep(5)
            



# rendering code (thanks chatgpt!)
x1 = [pt.x for pt in dataset if pt.label == 1]
y1 = [pt.y for pt in dataset if pt.label == 1]
x2 = [pt.x for pt in dataset if pt.label == -1]
y2 = [pt.y for pt in dataset if pt.label == -1]

plt.scatter(x1, y1, color='blue')
plt.scatter(x2, y2, color='red')

plt.plot([0, 300], [0, 300], color='black')

plt.xticks([])
plt.yticks([])
plt.box(False)

plt.show()