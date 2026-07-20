import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acotangent', () => {
    const complex = new Complex(1, 1);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(-0.5 * Math.log(2), 10);
    expect(result.im).toBeCloseTo(-0.25 * Math.PI, 10);
  });
});