import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex log mutation test', () => {
  it('log of negative real number should have imaginary part equal to pi', () => {
    const z = new Complex(-5, 0);
    const result = z.log();
    expect(result.re).toBeCloseTo(Math.log(5), 10);
    expect(result.im).toBeCloseTo(Math.PI, 10);
  });
});