import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('acsc of tiny positive imaginary number gives finite real part and negative infinite imaginary part', () => {
    const tiny = Number.MIN_VALUE; // tiny*tiny === 0 due to float underflow
    const result = new Complex(0, tiny).acsc();
    // Original: d=0 branch, im=-tiny/0=-Inf, asin(0,-Inf)=Complex(0,-Inf)
    // Mutated:  d=0 branch, im=+tiny/0=+Inf, asin(0,+Inf)=Complex(NaN,NaN)
    expect(result.re).toBe(0);
    expect(result.im).toBe(-Infinity);
  });
});