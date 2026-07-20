import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex log mutation detection', () => {
  it('should correctly compute log of a negative real number', () => {
    // log(-1) = i*pi, re=0, im=pi
    const result = new Complex(-1, 0).log();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI, 10);
  });
});