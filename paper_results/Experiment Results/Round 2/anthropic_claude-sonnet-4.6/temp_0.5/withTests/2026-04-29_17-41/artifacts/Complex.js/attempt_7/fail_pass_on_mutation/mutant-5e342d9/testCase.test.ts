import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sign with large values", () => {
  it("sign of large complex number is correct", () => {
    const c = new Complex(4000, 3000);
    const s = c.sign();
    expect(s.re).toBeCloseTo(0.8, 10);
    expect(s.im).toBeCloseTo(0.6, 10);
  });
});