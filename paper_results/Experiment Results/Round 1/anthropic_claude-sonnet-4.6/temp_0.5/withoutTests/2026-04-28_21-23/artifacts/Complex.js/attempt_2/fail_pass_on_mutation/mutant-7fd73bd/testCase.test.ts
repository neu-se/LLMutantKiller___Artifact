import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex log mutation detection', () => {
  it('should correctly compute log for purely imaginary number', () => {
    const z = new Complex(0, 1);
    const result = z.log();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});