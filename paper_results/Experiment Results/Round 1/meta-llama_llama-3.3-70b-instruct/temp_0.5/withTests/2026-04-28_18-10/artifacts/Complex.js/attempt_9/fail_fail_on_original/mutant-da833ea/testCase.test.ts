import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct result for asech', () => {
    const complex = new Complex(1, 0);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
  });
});