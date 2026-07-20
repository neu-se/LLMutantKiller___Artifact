import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsch', () => {
  it('should correctly compute acsch for a real positive number where a !== 0 and b === 0', () => {
    // acsch(1) = log(1 + sqrt(1^2 + 1)) = log(1 + sqrt(2))
    const c = new Complex(1, 0);
    const result = c.acsch();
    const expected = Math.log(1 + Math.sqrt(1 * 1 + 1));
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});