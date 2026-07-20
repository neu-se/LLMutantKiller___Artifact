import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex null/undefined parsing", () => {
  it("should parse null as zero (re and im both 0)", () => {
    const c = new Complex(null);
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
  });
});