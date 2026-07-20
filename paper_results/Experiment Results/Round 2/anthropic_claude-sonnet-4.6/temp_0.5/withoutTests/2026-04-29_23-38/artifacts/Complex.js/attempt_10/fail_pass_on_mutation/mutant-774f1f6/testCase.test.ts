import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex construction with undefined arguments", () => {
  it("should return zero complex number when called with no arguments", () => {
    const c = new Complex(undefined as any, undefined as any);
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
    expect(c.isZero()).toBe(true);
  });
});