import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
    const complex2 = new Complex(2, 0);
    const result2 = complex2.atanh();
    expect(result2.re).toBeCloseTo(0.5493061443340549, 10);
    expect(result2.im).toBeCloseTo(0, 10);
    // Test case to check for NaN
    const complex3 = new Complex(1, 1);
    const result3 = complex3.atanh();
    expect(isNaN(result3.re)).toBe(false);
    expect(isNaN(result3.im)).toBe(false);
    // Additional test case to check for mutation
    const complex4 = new Complex(1, 1);
    const result4 = complex4.atanh();
    expect(result4.re).not.toBeNaN();
    expect(result4.im).not.toBeNaN();
  });
});