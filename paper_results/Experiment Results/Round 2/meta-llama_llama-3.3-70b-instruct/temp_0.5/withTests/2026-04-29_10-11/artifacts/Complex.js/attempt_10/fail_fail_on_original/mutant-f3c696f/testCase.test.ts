import { Complex } from "./complex";

describe('Complex', () => {
  it('should return the correct result for acot', () => {
    const complex = new Complex(0, 1);
    const result = complex.acot();
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});