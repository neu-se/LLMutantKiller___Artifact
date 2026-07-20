import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct result for acot', () => {
    const complex = new Complex(1, 2);
    const result = complex.acot();
    expect(result.im).toBeLessThan(0);
  });
});