import numpy as np

# i really hate python class structure

class NN:
    # input_size: number of distinct features (2 for XOR)
    # hidden_size: the layer of neurons that processes the input
    # output_size: size of the output
    def __init__(self, input_size, hidden_size, output_size):
        self.input_size = input_size
        self.hidden_size = hidden_size
        self.output_size = output_size

        # weights
        self.weights = np.random.uniform(-1, 1, (input_size, hidden_size))
        self.weights2 = np.random.uniform(-1, 1, (hidden_size, output_size))

        # biases
        self.bias = np.zeros((hidden_size,))
        self.bias2 = np.zeros((output_size,))
        
        self.learning_rate = 0.25 # smaller -> less adaptable to new data (needs lot of new data to influence)

        pass

    def sigmoid(self, x):
        return 1 / (1 + np.exp(-x))
    
    def sigmoid_derivative(self, x):
        return x * (1 - x)
    
    def forward(self, inputs):
        self.hidden = self.sigmoid(np.dot(inputs, self.weights) + self.bias)
        self.output = self.sigmoid(np.dot(self.hidden, self.weights2) + self.bias2)

        # print(np.dot(self.hidden, self.weights2) + self.bias2)

        return self.output
    
    def train(self, inputs, targets, epochs):
        for epoch in range(epochs):
            error = 0

            for x, y in zip(inputs, targets):
                output = self.forward(x)

                output_err = y - output
                error += np.mean(output_err ** 2)

                # backpropagation
                output_d = output_err * self.sigmoid_derivative(output)
                hidden_err = np.dot(output_d, self.weights2.T)
                hidden_d = hidden_err * self.sigmoid_derivative(self.hidden)

                # learning rate * error amount
                # look at what both the error and previous iteration
                self.weights += self.learning_rate * np.outer(x, hidden_d)
                self.weights2 += self.learning_rate * np.outer(self.hidden, output_d)

                # based on error
                self.bias += self.learning_rate * hidden_d
                self.bias2 += self.learning_rate * output_d

                if epoch % 500 == 0:
                    print(f"{epoch} epochs done, error percentile: {error / len(inputs)}")
                
                """decaying learning rate (starts aggressive -> fine tunes)
                if epoch % 1000 == 0:
                    self.learning_rate *= 0.9
                """


"""
nn = NN(2, 64, 8)
inputs = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
targets = np.array([[0], [1], [1], [0]])
nn.train(inputs, targets, 10000)

# test it on the data it trained with
for x in inputs:
    print(f"Input: {x}, Output: {nn.forward(x)}")
"""

nn = NN(3, 6, 1)
inputs = np.array([[0, 0, 0], [1, 0, 1], [0, 1, 1], [1, 1, 1], [0, 0, 1], [0, 1, 0], [1, 0, 1], [1, 1, 0]])
targets = np.array([[1], [0], [0], [1], [0], [0], [0], [0]])
nn.train(inputs, targets, 5000000)

# test it on the data it trained with
for x in inputs:
    print(f"input: {x}, output: {nn.forward(x)}")
