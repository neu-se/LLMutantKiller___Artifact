import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should handle null input and produce correct string representation", () => {
    const c = new Complex(null as any);
    // toString checks Math.abs(a) < Complex.EPSILON
    // If a were undefined, Math.abs(undefined) = NaN, NaN < epsilon = false
    // So it would not set a=0, and toString would return "undefined" or similar
    // But a IS 0 from initialization regardless of mutation
    expect(c.toString()).toBe('0');
  });
});