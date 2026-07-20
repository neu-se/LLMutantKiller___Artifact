import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsch', () => {
  it('acsch(1+i) should produce a specific finite result', () => {
    const result = new Complex(1, 1).acsch();
    // The original code uses the fallback branch when d=0
    // Let's verify the result matches what the fallback branch computes
    // vs what the mutated first branch would compute
    const fallback = new Complex(Infinity, -Infinity).asinh();
    expect(result.re).toBeCloseTo(fallback.re, 10);
    expect(result.im).toBeCloseTo(fallback.im, 10);
  });
});