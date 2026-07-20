import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asech', () => {
  it('asech with tiny negative imaginary where d underflows should differ from acosh(0,0)', () => {
    // b = -5e-324 (negative tiny), a = 0
    // d = 0*0 + (-5e-324)*(-5e-324) = 0 (underflow)
    // isZero() is false since im != 0
    // Original: new Complex(0, -(-5e-324)/0).acosh() = new Complex(0, Infinity).acosh()
    // Mutated: new Complex(0, 0).acosh()
    const c = new Complex(0, -5e-324);
    const result = c.asech();
    const mutatedResult = new Complex(0, 0).acosh();
    // They should differ
    expect(result.re).not.toBe(mutatedResult.re);
  });
});