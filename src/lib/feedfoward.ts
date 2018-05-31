import { Matrix } from './matrix';

export class FeedFoward {
  private weights_inputs_to_hidden: Matrix;
  private weights_hidden_to_output: Matrix;
  private bias_inputs_to_hidden: Matrix;
  private bias_hidden_to_output: Matrix;
  private lr: number;
  constructor(
    private inputs: number,
    private hidden: number,
    private output: number,
    private ops?: {
        learning_rate: number;
        weights_random_min: number;
        weights_random_max: number;
        bias_random_min: number;
        bias_random_max: number;
      }
  ) {
    if(!this.ops) {
      this.ops = {
        bias_random_max: 1,
        bias_random_min: 0,
        learning_rate: 0.1,
        weights_random_max: 1,
        weights_random_min: 0,
      }
    }
    this.lr = this.ops.learning_rate;
    this.weights_inputs_to_hidden = new Matrix(this.hidden, this.inputs).randomize(this.ops.weights_random_min,this.ops.weights_random_max);
    this.weights_hidden_to_output = new Matrix(this.output, this.hidden).randomize(this.ops.weights_random_min,this.ops.weights_random_max);

    this.bias_inputs_to_hidden = new Matrix(this.hidden, 1).randomize(this.ops.bias_random_min, this.ops.bias_random_max);
    this.bias_hidden_to_output = new Matrix(this.output, 1).randomize(this.ops.bias_random_min, this.ops.bias_random_max);
  }

  public Predict(input_array: number[]): number[] {
    const input = Matrix.fromArray(input_array);
    // Calculate input layer to hidden layer
    const hidden = this.weights_inputs_to_hidden
                      .dotProduct(input)
                      .add(this.bias_inputs_to_hidden)
                      .map(this.sigmoid);
    // Calculate hidden layer to output layer
    const output = this.weights_hidden_to_output
                      .dotProduct(hidden)
                      .add(this.bias_hidden_to_output)
                      .map(this.sigmoid)
    return output.toArray();
  }

  public Train(input_array: number[], labels_array: number[]): void {
    const labels = Matrix.fromArray(labels_array);

    const input = Matrix.fromArray(input_array);
    // Calculate input layer to hidden layer
    const hidden = this.weights_inputs_to_hidden
      .dotProduct(input)
      .add(this.bias_inputs_to_hidden)
      .map(this.sigmoid);
    // Calculate hidden layer to output layer
    const output = this.weights_hidden_to_output
      .dotProduct(hidden)
      .add(this.bias_hidden_to_output)
      .map(this.sigmoid)

    const output_errors = labels.subtract(output);

    // let gradient = outputs * (1 - outputs);
    // Calculate gradient
    const gradients = output.map(this.dsigmoid)
                            .multiplyElementWise(output_errors)
                            .multiplyElementWise(this.lr);

    // Calculate deltas
    const hidden_tranpose = hidden.transpose();
    const weight_hiden_to_output_deltas = gradients.dotProduct(hidden_tranpose);

    // Adjust the weights and bias by deltas
    this.weights_hidden_to_output = this.weights_hidden_to_output.add(weight_hiden_to_output_deltas);
    this.bias_hidden_to_output = this.bias_hidden_to_output.add(gradients);

    // Calculate the hidden layer errors
    const weights_hidden_to_output_transpose = this.weights_hidden_to_output.transpose();

    const hidden_errors = weights_hidden_to_output_transpose.dotProduct(output_errors);

    // Calculate hidden gradient
    const hidden_gradient = hidden.map(this.dsigmoid)
                                  .multiplyElementWise(hidden_errors)
                                  .multiplyElementWise(this.lr);

    // Calcuate input->hidden deltas
    const input_transpose = input.transpose();
    const weights_inputs_to_hidden_delta = hidden_gradient.dotProduct(input_transpose);

    // Adjust the bias by its deltas (which is just the gradients)
    this.weights_inputs_to_hidden = this.weights_inputs_to_hidden.add(weights_inputs_to_hidden_delta);
    this.bias_inputs_to_hidden = this.bias_inputs_to_hidden.add(hidden_gradient);

  }

  private sigmoid(x: number): number {
    return 1 / (1 + Math.exp(-x)) 
  }

  private dsigmoid(y: number): number {
    return y * (1 - y); 
  }

}