### Perceptron Algorithm
    1. For every input, multiply that input by its weight.
    2. Sum all of the weighted inputs.
    3. Compute the output of the perceptron base on the sum
    passed through an activation function (the sign of the sum);


### Supervised Learning

    1. Provide the perceptron with inputs for which the is a known answer.
    2. Ask the perceptron to guess an answer.
    3. Compute the error. (Did it get the answer right or wrong?)
    4. Adjust all the weights according to the error.
    5. Return to Step 1 and repeat!


- How come fixing both weights at the same time works. Shouldn't each weight be adjusted individually? 

- How does the bias work? Why does it help?

- Gradient Decent is the process of tweaking the perceptron to get it closer to a desired outcome.
---
## Things to learn in the future:

    - K-fold cross validation to prevent overfitting.
    - ReLU activation function.