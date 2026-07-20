import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return a specific result when asec is called with a non-zero value', () => {
    const complex = new Complex(1, 0);
    const result = complex.asec();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
  });
});