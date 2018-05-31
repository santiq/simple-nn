export class Matrix {

  public static fromArray(array: number[]): Matrix {
    const result = new Matrix(array.length, 1);
    for (let i = 0; i < result.rows; i++) {
      result.data[i][0] = array[i];
    }
    return result;
  }

  public data: number[][] = [];

  constructor(public rows: number, public columns: number, data?: number[][]){
    if(data) {
      this.data = data;
    } else {
      for (let i = 0; i < rows; i++) {
        this.data.push([]);
        for (let j = 0; j < columns; j++) {
          this.data[i][j] = 0;
        }
      }
    }
  }

  /**
   * Returns the data from inside the matrix as a single dimensional array
   */
  public toArray(): number[] {
    const result = [];
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        result.push(this.data[i][j]);
      }
    }
    return result;
  }

  public add(operand: Matrix | number): Matrix {
    if (operand instanceof Matrix) {
      if(operand.rows !== this.rows || operand.columns !== this.columns) {
        return this.clone();
      }
      const result = this.clone();
      for(let i = 0, rows = operand.rows; i< rows; i++) {
        for(let j = 0, cols = operand.columns; j < cols; j++) {
          result.data[i][j] += operand.data[i][j];
        }
      }
      return result;
    } else {
      const result = this.clone();
      for (let i = 0, rows = this.rows; i < rows; i++) {
        for (let j = 0, cols = this.columns; j < cols; j++) {
          result.data[i][j] += operand;
        }
      }
      return result;
    }
  }

  public subtract(operand: Matrix | number): Matrix {
    if (operand instanceof Matrix) {
      if (operand.rows !== this.rows || operand.columns !== this.columns) {
        return this.clone();
      }
      const result = this.clone();
      for (let i = 0, rows = operand.rows; i < rows; i++) {
        for (let j = 0, cols = operand.columns; j < cols; j++) {
          result.data[i][j] -= operand.data[i][j];
        }
      }
      return result;
    } else {
      const result = this.clone();
      for (let i = 0, rows = this.rows; i < rows; i++) {
        for (let j = 0, cols = this.columns; j < cols; j++) {
          result.data[i][j] -= operand;
        }
      }
      return result;
    }
  }

  /**
   * Multiply element wise
   * @param operand Matrix for Haramad multplication or number for scalar multiplication
   */
  public multiplyElementWise (operand: Matrix | number): Matrix {
    if (operand instanceof Matrix) {
      if (operand.rows !== this.rows || operand.columns !== this.columns) {
        return this.clone();
      }
      const result = this.clone();
      for (let i = 0, rows = operand.rows; i < rows; i++) {
        for (let j = 0, cols = operand.columns; j < cols; j++) {
          result.data[i][j] *= operand.data[i][j];
        }
      }
      return result;
    } else {
      const result = this.clone();
      for (let i = 0, rows = this.rows; i < rows; i++) {
        for (let j = 0, cols = this.columns; j < cols; j++) {
          result.data[i][j] *= operand;
        }
      }
      return result;
    }
  }

  public dotProduct (b: Matrix ): Matrix {
    if(this.columns !== b.rows) {
      return this.clone();
    } else {
      const result = new Matrix(this.rows, b.columns);
      for (let i = 0, rows = this.rows; i < rows; i++) {
        for (let j = 0, cols = b.columns; j < cols; j++) {
          result.data[i][j] = 0;
          for(let k = 0, ocols = this.columns; k<ocols; k++) {
            result.data[i][j] += this.data[i][k] * b.data[k][j];
          }
        }
      }
      return result;
    }
  }

  public transpose(): Matrix {
    const result = new Matrix(this.columns, this.rows);
    for (let i = 0, rows = this.rows; i < rows; i++) {
      for (let j = 0, cols = this.columns; j < cols; j++) {
        result.data[j][i] = this.data[i][j];
      }
    }
    return result;
  }

  public randomize(min: number = 0, max: number = 1): Matrix {
    const result = this.clone();
    for (let i = 0, rows = this.rows; i < rows; i++) {
      for (let j = 0, cols = this.columns; j < cols; j++) {
        result.data[i][j] = this.random(min,max);
      }
    }
    return result;
  }

  public clone(): Matrix {
    return new Matrix(this.rows, this.columns, this.data);
  }

  /**
   * Oh god I LOVE functors
   */
  public map(func: (element: number) => number): Matrix {
    const result = this.clone();
    for (let i = 0, rows = this.rows; i < rows; i++) {
      for (let j = 0, cols = this.columns; j < cols; j++) {
        result.data[i][j] = func(this.data[i][j]);
      }
    }
    return result;
  }

  private random(minimum: number, maximum: number): number {
    return Math.round(Math.random() * (maximum - minimum + 1) + minimum);
  }

}