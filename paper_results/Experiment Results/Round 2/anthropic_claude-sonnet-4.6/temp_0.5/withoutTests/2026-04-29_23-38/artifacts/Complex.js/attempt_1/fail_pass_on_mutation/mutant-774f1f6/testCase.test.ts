import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex null/undefined parsing", () => {
  it("should correctly parse null input and set re to 0", () => {
    const c = new Complex(null as any);
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
  });
});