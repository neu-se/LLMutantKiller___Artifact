import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when trying to calculate atanh with invalid input', () => {
    const complex = new Complex(1, 'a');
    expect(() => {
      complex.atanh();
    }).toThrow();
  });
});