import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct result for acsc', () => {
    const complex = new Complex(1, 1);
    const resultOriginal = new Complex(1, -1).acsc();
    const result = complex.acsc();
    expect(result.im).toBeLessThan(0);
  });
});