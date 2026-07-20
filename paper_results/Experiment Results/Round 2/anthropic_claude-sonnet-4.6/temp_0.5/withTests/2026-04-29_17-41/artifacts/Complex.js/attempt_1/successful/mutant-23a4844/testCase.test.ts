import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh edge case when d=0", () => {
  it("atanh(1) should have infinite real part", () => {
    const result = new Complex(1, 0).atanh();
    // In original: (a !== -1) ? (a / 0) : 0 => 1/0 = Infinity
    // In mutant:   (a !== -1) ? (a * 0) : 0 => 1*0 = 0
    // logHypot(Infinity, 0) / 2 = Infinity vs logHypot(0, 0) / 2 = -Infinity
    expect(isFinite(result.re)).toBe(false);
    expect(result.re).toBeGreaterThan(0);
  });
});