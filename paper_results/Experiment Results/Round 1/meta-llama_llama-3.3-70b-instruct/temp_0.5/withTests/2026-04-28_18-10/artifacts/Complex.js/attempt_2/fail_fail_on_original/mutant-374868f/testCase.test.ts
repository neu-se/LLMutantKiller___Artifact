import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate asech correctly', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    const originalResult = new Complex(1.3169578969248166, 0);
    expect(result.re).toBeCloseTo(originalResult.re);
    expect(result.im).toBeCloseTo(originalResult.im);
    const mutatedResult = new Complex(0.5 * (1 / (0.5 * 0.5 + 0.5 * 0.5)), 0); // simulate the mutated code
    expect(result.re).not.toBeCloseTo(mutatedResult.re);
  });
});