import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex with undefined", () => {
  it("should return zero for both re and im when input is undefined", () => {
    const c = new Complex(undefined);
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
    // Verify arithmetic works correctly with this zero value
    const squared = c.mul(c);
    expect(squared.re).toBe(0);
    expect(squared.im).toBe(0);
  });
});