import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex with null", () => {
  it("should produce a valid zero complex when given null, verifiable through arithmetic", () => {
    const c = new Complex(null);
    // add a real number to verify im is truly 0
    const result = c.add(new Complex(1, 1));
    expect(result.re).toBe(1);
    expect(result.im).toBe(1);
  });
});