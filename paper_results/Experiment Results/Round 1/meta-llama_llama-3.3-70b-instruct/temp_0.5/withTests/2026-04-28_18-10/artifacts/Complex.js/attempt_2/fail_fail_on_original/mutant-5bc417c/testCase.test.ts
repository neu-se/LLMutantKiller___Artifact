import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return correct result for acoth function with division by zero', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.acoth()).toThrow();
  });
});