import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex exp with chained operations', () => {
  it('exp result should satisfy exp(a)*exp(b) = exp(a+b)', () => {
    const a = new Complex(1, 2);
    const b = new Complex(3, 0);
    
    // exp(1+2i) * exp(3) should equal exp(4+2i)
    const expA = a.exp();
    const expB = b.exp();
    const product = expA.mul(expB);
    const expSum = a.add(b).exp();
    
    expect(product.re).toBeCloseTo(expSum.re, 8);
    expect(product.im).toBeCloseTo(expSum.im, 8);
  });
});