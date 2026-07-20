import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asinh", () => {
  it("should correctly compute asinh of a complex number with distinct re and im parts", () => {
    // For input (3, 4), the mutation sets this['re'] = -4 instead of restoring it to 3
    // before computing the final result, causing a wrong answer
    const c = new Complex(3, 4);
    const result = c.asinh();
    
    // asinh(3 + 4i) known value
    const expected_re = 2.2996706994104157;
    const expected_im = 0.9176168533514787;
    
    expect(result.re).toBeCloseTo(expected_re, 8);
    expect(result.im).toBeCloseTo(expected_im, 8);
  });
});