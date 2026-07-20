import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atan function", () => {
  it("should return Complex(0, Infinity) when re=0 and im=1", () => {
    const c = new Complex(0, 1);
    const result = c.atan();
    expect(result.re).toBe(0);
    expect(result.im).toBe(Infinity);
  });
});