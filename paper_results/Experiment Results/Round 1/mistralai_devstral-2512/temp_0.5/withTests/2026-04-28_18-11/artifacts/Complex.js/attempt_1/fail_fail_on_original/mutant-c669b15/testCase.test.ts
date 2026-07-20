// Test case to detect the mutation in the div method
import { Complex } from "./complex.js";

describe('Complex division edge case', () => {
  it('should correctly handle division when |c| == |d|', () => {
    // Create two complex numbers where the absolute values of real and imaginary parts are equal
    const a = new Complex(1, 1);
    const b = new Complex(1, 1);
    const result = a.div(b);
    
    // The expected result of (1+i)/(1+i) should be 1+0i
    const expected = new Complex(1, 0);
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});