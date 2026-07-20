import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return correct result for acoth function', () => {
    const complex = new Complex(1, 2);
    const result = complex.acoth();
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(0);
  });
});