import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex pow', () => {
  it('should correctly compute (1+i)^2 = 2i, not zero', () => {
    // (1+i)^2 = 1 + 2i - 1 = 2i
    // This reaches the general path where if(a===0&&b===0) check is
    // With mutation if(true), returns ZERO instead of 2i
    const result = new Complex(1, 1).pow(new Complex(2, 0));
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(2, 5);
  });
});