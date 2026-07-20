import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acsch correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
    // The mutation changes the condition in the acsch function from 
    // if (b === 0) to if (true), so the result should be different 
    // when b is not 0.
    const complex2 = new Complex(1, 1);
    const result2 = complex2.acsch();
    expect(result2.re).not.toBeCloseTo(result.re, 10);
  });
});