import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs", () => {
  it("abs of 3000+3000i equals 3000*sqrt(2) via large-value hypot path", () => {
    const c = new Complex(3000, 3000);
    // Original code (else branch): b = 3000/3000 = 1, result = 3000*sqrt(2) = 4242.640687119286
    // Mutated code (if branch): a=3000, b=3000/3000=1, result = 3000*sqrt(2) = 4242.640687119286
    expect(c.abs()).toBe(3000 * Math.sqrt(2));
  });
});