import { Complex } from "../../../../../complex.js";

describe('Complex', () => {
  it('should return the correct result for acoth', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    const expected = new Complex(0.5, -0.5);
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
    expect(result.im).not.toBeCloseTo(0.5, 10); // This line should cause the test to fail on the mutated code
  });
});