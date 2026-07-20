import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsch', () => {
  it('acsch(2+3i) gives the correct value', () => {
    const c = new Complex(2, 3);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0.15735549884498543, 10);
  });
});