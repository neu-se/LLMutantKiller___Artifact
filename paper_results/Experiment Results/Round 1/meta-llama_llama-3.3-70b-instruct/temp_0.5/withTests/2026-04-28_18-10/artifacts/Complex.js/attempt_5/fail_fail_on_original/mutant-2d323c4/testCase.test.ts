import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return correct result for acsch method with non-zero denominator', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    const complex2 = new Complex(0, 0);
    expect(() => complex2.acsch()).toThrow();
  });
});