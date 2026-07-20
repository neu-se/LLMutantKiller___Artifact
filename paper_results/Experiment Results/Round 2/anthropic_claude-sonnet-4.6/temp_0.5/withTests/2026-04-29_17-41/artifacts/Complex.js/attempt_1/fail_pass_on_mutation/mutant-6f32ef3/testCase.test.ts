import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString with negative zero imaginary part", () => {
  it("should correctly represent a pure imaginary number with b = -0", () => {
    const c = new Complex(0, -0);
    // With original code (b < 0): -0 < 0 is false, so no negation, result is "0i" or similar
    // With mutated code (b <= 0): -0 <= 0 is true, so b gets negated and "-" is prepended
    expect(c.toString()).toBe("0");
  });
});