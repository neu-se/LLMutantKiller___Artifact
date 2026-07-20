import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct result for atanh', () => {
    const complex = new Complex(1.5, 0);
    const result = complex.atanh();
    if (result.im !== 0) {
      throw new Error("atanh of a real number should have an imaginary part of 0");
    }
  });
});