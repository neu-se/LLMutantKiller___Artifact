import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc with underflow', () => {
  it('computes acsc correctly when d underflows to zero with non-zero imaginary part', () => {
    // Use a very small b such that b*b underflows to 0, making d=0
    // but b !== 0, so the mutation matters: -b/0 = -Infinity vs +b/0 = +Infinity
    const b = 5e-324; // smallest positive double (Number.MIN_VALUE)
    const z = new Complex(0, b);
    const result = z.acsc();
    // With original: new Complex(0, -b/0).asin() = new Complex(0, -Infinity).asin()
    // With mutated:  new Complex(0, +b/0).asin() = new Complex(0, +Infinity).asin()
    // asin(0 - i*Infinity) should have negative imaginary part
    // asin(0 + i*Infinity) should have positive imaginary part
    expect(result.im).toBeLessThan(0);
  });
});