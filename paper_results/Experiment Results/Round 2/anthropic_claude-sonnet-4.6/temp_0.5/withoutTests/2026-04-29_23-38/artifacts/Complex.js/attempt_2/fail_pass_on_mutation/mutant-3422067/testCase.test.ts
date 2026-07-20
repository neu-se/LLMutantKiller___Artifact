import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs", () => {
  it("abs of complex number with large equal components", () => {
    // x=4000, y=4000: a=b=4000, triggers large path
    // Original: else branch: b = y/x = 1, result = 4000*sqrt(2)
    // Mutated: if branch: a=4000, b = x/y = 1, result = 4000*sqrt(2)
    // These are identical... but let's verify with exact IEEE 754
    const c = new Complex(4000, 4000);
    expect(c.abs()).toBe(4000 * Math.sqrt(2));
  });
});