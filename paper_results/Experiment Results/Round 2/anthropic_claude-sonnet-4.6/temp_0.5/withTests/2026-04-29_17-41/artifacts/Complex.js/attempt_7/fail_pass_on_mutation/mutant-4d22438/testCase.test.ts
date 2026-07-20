import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("abs mutation", () => {
  it("abs of 4001+5000i matches expected pythagorean value", () => {
    const re = 4001;
    const im = 5000;
    const c = new Complex(re, im);
    const expected = Math.sqrt(re * re + im * im);
    const actual = c.abs();
    // On mutated code b = y*x makes result astronomically large
    expect(actual).toBeGreaterThan(expected * 0.9999);
    expect(actual).toBeLessThan(expected * 1.0001);
  });
});