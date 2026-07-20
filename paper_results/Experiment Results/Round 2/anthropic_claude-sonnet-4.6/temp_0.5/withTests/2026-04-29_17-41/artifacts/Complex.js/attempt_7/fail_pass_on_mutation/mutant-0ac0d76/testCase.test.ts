import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex pow', () => {
  it('pow with negative real base and integer exponent', () => {
    // (-2)^2 = 4
    const result = new Complex(-2, 0).pow(2);
    expect(result.re).toBeCloseTo(4, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});