import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex pow with complex exponent', () => {
  it('computes (2+0i)^(1+1i) correctly - reaches the zero-base check', () => {
    // This has complex exponent, so it goes through the general path
    // With mutation if(true), it returns ZERO instead of correct value
    const result = new Complex(2, 0).pow(new Complex(1, 1));
    expect(result.re).not.toBeCloseTo(0, 5);
  });
});