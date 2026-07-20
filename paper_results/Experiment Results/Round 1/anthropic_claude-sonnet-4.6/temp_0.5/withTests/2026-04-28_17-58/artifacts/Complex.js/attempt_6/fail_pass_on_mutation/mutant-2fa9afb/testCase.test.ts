import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex cot', () => {
  it('computes cot correctly - detects mutation in comment structure', () => {
    // cot(pi/4) = 1
    const result = new Complex(Math.PI / 4, 0).cot();
    expect(result.re).toBeCloseTo(1, 5);
    expect(result.im).toBeCloseTo(0, 5);
  });
});