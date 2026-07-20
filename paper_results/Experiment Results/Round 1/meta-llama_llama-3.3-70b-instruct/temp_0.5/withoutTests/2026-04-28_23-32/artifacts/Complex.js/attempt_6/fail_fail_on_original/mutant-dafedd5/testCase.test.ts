import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the ceiling of a complex number', () => {
    const complex = new Complex(10.12345, 20.6789);
    const result = complex.ceil(2);
    expect(result.re).toBeCloseTo(10.12, 2);
    expect(result.im).toBeCloseTo(20.68, 2);
    const complexMutated = new Complex(10.12345, 20.6789);
    const resultMutated = complexMutated.ceil(2);
    expect(resultMutated.re).toBeCloseTo(10.12, 2);
    expect(resultMutated.im).toBeCloseTo(20.68, 2);
    // Test case to check if the mutated code fails
    const complex2 = new Complex(10.12345, 20.6789);
    const result2 = complex2.ceil(1);
    expect(result2.re).toBeCloseTo(11, 0);
  });
});