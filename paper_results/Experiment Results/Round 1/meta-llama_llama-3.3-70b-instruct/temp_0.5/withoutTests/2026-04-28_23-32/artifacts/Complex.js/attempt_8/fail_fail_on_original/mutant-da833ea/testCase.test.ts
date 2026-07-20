import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct result for asech', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    expect(result.im).toBeCloseTo(0, 10);
    // Additional assertion to make the test fail on the mutated code
    expect(result.re).not.toBeNaN();
  });
});