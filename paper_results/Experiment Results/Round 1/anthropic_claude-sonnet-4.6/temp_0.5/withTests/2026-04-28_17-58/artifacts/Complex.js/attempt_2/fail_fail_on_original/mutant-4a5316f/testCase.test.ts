import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth with underflow', () => {
  it('computes acoth correctly when b is subnormal causing b*b to underflow to zero', () => {
    // Use the smallest positive number whose square underflows to 0
    const b = 5e-324; // Number.MIN_VALUE - smallest positive float
    // b*b underflows to 0, so d = 0*0 + b*b = 0, but b !== 0
    // Original: new Complex(0, -b/0).atanh() = new Complex(0, -Infinity).atanh()
    // Mutated:  new Complex(0, +b/0).atanh() = new Complex(0, +Infinity).atanh()
    const result = new Complex(0, b).acoth();
    const resultNeg = new Complex(0, -b).acoth();
    // atanh(0 - Infinity*i) should have negative imaginary part
    // atanh(0 + Infinity*i) should have positive imaginary part
    expect(result.im).toBeLessThan(0);
    expect(resultNeg.im).toBeGreaterThan(0);
  });
});