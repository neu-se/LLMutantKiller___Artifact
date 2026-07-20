import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle multiplication of two complex numbers and fail on mutated code', () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(3, 0);
    const result = c1.mul(c2);
    expect(result.re).toBeCloseTo(3);
    expect(result.im).toBeCloseTo(6);
    const c3 = new Complex(1, 2);
    const c4 = new Complex(0, 0);
    const result2 = c3.mul(c4);
    expect(result2.re).toBeCloseTo(0);
    expect(result2.im).toBeCloseTo(0);
    // The mutation is in the line if (z['im'] === 0 && this[""] === 0), 
    // so we need to test the case where this[""] is accessed
    const c5 = new Complex(1, 0);
    const c6 = new Complex(0, 0);
    expect(() => c5.mul(c6)).toThrowError();
  });
});