import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc special case", () => {
  it("acsc(0) should have imaginary part equal to Infinity", () => {
    const result = new Complex(0).acsc();
    expect(isFinite(result.im)).toBe(false);
    expect(result.im).toBe(Infinity);
  });
});