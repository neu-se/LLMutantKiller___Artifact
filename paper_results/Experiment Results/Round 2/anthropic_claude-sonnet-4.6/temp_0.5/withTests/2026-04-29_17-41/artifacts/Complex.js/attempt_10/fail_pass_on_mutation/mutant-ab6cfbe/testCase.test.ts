import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow", () => {
  it("pow(0, -1) should return Complex(0, -Infinity) not Complex(-Infinity, 0)", () => {
    const result = new Complex(0, 0).pow(-1);
    expect(result.re).toBe(0);
    expect(result.im).toBe(-Infinity);
  });
});