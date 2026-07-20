import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex null input sets re to 0", () => {
  it("should have re property equal to 0 when null is passed, verified through computation", () => {
    const c = new Complex(null);
    // If re were NaN or undefined, these would fail
    expect(isNaN(c.re)).toBe(false);
    expect(isNaN(c.im)).toBe(false);
    expect(c.re).toStrictEqual(0);
    expect(c.im).toStrictEqual(0);
    expect(c.isZero()).toBe(true);
    expect(c.isNaN()).toBe(false);
  });
});