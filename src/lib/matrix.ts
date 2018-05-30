import Table from 'easy-table';

export class Matrix {

  public static fromArray(array: number[][]): Matrix | undefined {
    if(!array[0]) {
      return undefined;
    }
    return new Matrix(array.length, array[0].length);
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
   * Returns the array of data that it's inside the matrix
   */
  public toArray(): number[][] {
    return this.clone().data;
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

  public product (b: Matrix ): Matrix {
    if(this.columns !== b.rows) {
      return this.clone();
    } else {
      const result = new Matrix(this.rows, this.columns);




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

  public randomize(): Matrix {
    const result = this.clone();
    for (let i = 0, rows = this.rows; i < rows; i++) {
      for (let j = 0, cols = this.columns; j < cols; j++) {
        result.data[i][j] = Math.round(Math.random());
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

  public print(): void {
    Table.log(this.data);
  }

}