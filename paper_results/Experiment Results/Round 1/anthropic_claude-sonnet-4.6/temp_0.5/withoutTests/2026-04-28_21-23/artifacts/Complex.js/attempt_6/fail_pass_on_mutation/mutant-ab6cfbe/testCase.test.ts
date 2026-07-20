import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex log', () => {
  it('log of negative real number should have imaginary part PI', () => {
    const result = new Complex(-1, 0).log();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI, 10);
  });
});