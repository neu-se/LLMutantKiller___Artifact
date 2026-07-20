import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth', () => {
  it('should have opposite imaginary sign for acoth with tiny positive imaginary part causing d underflow', () => {
    const tiny = 5e-324;
    const c = new Complex(0, tiny);
    const result = c.acoth();
    // Check that result differs from the mutated version
    // Original: -b/0 = -Infinity for imaginary part of atanh input
    // Mutated: +b/0 = +Infinity for imaginary part of atanh input
    // atanh(0, -Infinity) vs atanh(0, +Infinity) should have opposite im signs
    const resultMutated = new Complex(0, -tiny).acoth(); // negative b flips the sign
    expect(Math.sign(result.im)).not.toEqual(Math.sign(resultMutated.im));
  });
});