import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acsc', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    const originalResult = new Complex(-0.5, -0.5).acsc();
    expect(result.re).toBeCloseTo(originalResult.re);
    expect(result.im).toBeCloseTo(originalResult.im);
  });
});