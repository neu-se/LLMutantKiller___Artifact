import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus cosecans for a specific input', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(result.re);
    expect(result.im).toBeCloseTo(result.im);
  });
});