import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex log mutation test', () => {
  it('pow with complex exponent should give correct result', () => {
    // Test (2+0i)^(0+1i) which uses log internally with a=2, b=0 (hits the condition)
    const base = new Complex(2, 0);
    const exp = new Complex(0, 1);
    const result = base.pow(exp);
    // 2^i = exp(i*ln(2)) = cos(ln(2)) + i*sin(ln(2))
    expect(result.re).toBeCloseTo(Math.cos(Math.log(2)), 10);
    expect(result.im).toBeCloseTo(Math.sin(Math.log(2)), 10);
  });
});