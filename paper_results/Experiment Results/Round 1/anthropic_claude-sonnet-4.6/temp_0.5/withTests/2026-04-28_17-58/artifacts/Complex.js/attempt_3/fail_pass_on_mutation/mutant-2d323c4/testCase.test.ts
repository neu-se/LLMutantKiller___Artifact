import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsch', () => {
  it('computes acsch(0+2i) giving the correct imaginary result', () => {
    const c = new Complex(0, 2);
    const result = c.acsch();
    // From error log: actual result has im = -π/6
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 6, 10);
  });
});