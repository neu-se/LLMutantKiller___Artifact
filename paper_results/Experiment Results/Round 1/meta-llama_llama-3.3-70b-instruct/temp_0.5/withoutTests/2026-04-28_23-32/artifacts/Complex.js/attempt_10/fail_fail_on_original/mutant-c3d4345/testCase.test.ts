import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for asec when a is one and b is zero', () => {
    const complex = new Complex(1, 0);
    const result = complex.asec();
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(Infinity);
    // The mutation changes the condition in the asec method to if (true && b === 0), 
    // which will cause the method to return new Complex(0, Infinity) when a is not zero and b is zero.
    // So, this test should pass on the original code and fail on the mutated code.
  });
});