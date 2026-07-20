import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct result for asech', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    expect(result.im).toBeCloseTo(0);
  });
});