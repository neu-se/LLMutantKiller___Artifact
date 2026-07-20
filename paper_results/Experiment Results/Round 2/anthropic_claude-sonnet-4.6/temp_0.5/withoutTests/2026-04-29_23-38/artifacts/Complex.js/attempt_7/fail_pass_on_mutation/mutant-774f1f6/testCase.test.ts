import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex construction with null first argument and defined second", () => {
  it("should return zero complex number when first argument is null regardless of second argument", () => {
    const c = new Complex(null as any, 5);
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
  });
});