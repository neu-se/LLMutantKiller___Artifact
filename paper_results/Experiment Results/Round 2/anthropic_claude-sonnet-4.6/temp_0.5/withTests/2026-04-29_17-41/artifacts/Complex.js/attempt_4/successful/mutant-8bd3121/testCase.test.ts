import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acsch', () => {
  it('computes acsch(1) correctly', () => {
    const result = new Complex(1, 0).acsch();
    expect(result).not.toBeUndefined();
    expect(result.re).toBeCloseTo(0.8813735870195430, 8);
  });
});