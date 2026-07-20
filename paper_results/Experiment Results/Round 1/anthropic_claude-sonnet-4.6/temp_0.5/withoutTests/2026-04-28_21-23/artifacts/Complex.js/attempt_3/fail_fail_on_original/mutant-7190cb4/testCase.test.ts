import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc with subnormal numbers', () => {
  it('should handle very small complex numbers where d underflows to 0', () => {
    // Number.MIN_VALUE * Number.MIN_VALUE === 0 due to float underflow
    // So d = a*a + b*b = 0 even though b !== 0
    const tiny = Number.MIN_VALUE;
    const result = new Complex(0, tiny).acsc();
    // With original: (b !== 0) ? -b/0 : 0 = -Infinity (since b > 0)
    // With mutated:  (b !== 0) ? +b/0 : 0 = +Infinity (since b > 0)
    // asin(Complex(0, -Infinity)) vs asin(Complex(0, +Infinity))
    expect(result.im).toBeLessThan(0); // original gives negative im
  });
});