import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth', () => {
  it('should return correct imaginary sign for acoth when d underflows to zero with negative imaginary part', () => {
    // Use a very small b value that causes b*b to underflow to 0
    // With a=0, d = 0*0 + b*b = 0 (underflow), but b !== 0
    const tiny = 5e-324; // smallest positive double
    const c = new Complex(0, tiny);
    const result = c.acoth();
    // -b/0 with b=tiny gives -Infinity, so im of input to atanh is -Infinity
    // +b/0 with b=tiny gives +Infinity (mutation)
    // The imaginary part of the result should differ
    expect(result.im).toBeLessThan(0);
  });
});