import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct result for acot', () => {
    const complex = new Complex(1, 2);
    const result = complex.acot();
    const originalResult = new Complex(-0.5493061443340549, -0.7059487739463177);
    expect(result.re).toBeCloseTo(originalResult.re);
    expect(result.im).toBeCloseTo(originalResult.im);
  });
});