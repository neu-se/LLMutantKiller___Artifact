import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex mul with real numbers", () => {
  it("should correctly multiply two real complex numbers using the short circuit path", () => {
    const a = new Complex(3, 0);
    const b = new Complex(4, 0);
    const result = a.mul(b);
    expect(result.re).toBe(12);
    expect(result.im).toBe(0);
  });
});