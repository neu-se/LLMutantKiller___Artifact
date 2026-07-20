import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech mutation detection", () => {
  it("should return NaN for very small complex number where floating point d underflows to zero", () => {
    const tiny = 5e-200;
    // Verify preconditions: d underflows to 0 but value is not zero
    expect(tiny * tiny + tiny * tiny).toBe(0);
    const z = new Complex(tiny, tiny);
    expect(z.isZero()).toBe(false);

    const result = z.asech();
    // Original: else branch computes new Complex(0, -Infinity).acosh()
    //   which involves 0 * Infinity = NaN, so result is NaN
    // Mutated: else branch computes new Complex(0, 0).acosh()
    //   which gives Complex(0, pi/2) - not NaN
    expect(result.isNaN()).toBe(true);
  });
});