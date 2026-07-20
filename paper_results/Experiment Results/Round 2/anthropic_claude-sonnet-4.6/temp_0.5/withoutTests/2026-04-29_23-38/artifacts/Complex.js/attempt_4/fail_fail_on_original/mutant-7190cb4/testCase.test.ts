import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('computes acsc with negative tiny imaginary part where d underflows', () => {
    // b = -5e-324 (negative MIN_VALUE), a = 0
    // d = a*a + b*b = 0 (underflows), b !== 0
    // Original: (b !== 0) ? -b/0 : 0  => -(-5e-324)/0 = +Infinity
    // Mutated:  (b !== 0) ? +b/0 : 0  => +(-5e-324)/0 = -Infinity
    // asin(0, +Infinity): t1=Complex(Inf,0), t2=Complex(Inf-Inf,0)=NaN → NaN
    // asin(0, -Infinity): t1=Complex(Inf,0), t2=Complex(Inf+Inf,0)=Inf → finite
    const result = new Complex(0, -5e-324).acsc();
    expect(result.isNaN()).toBe(false);
  });
});