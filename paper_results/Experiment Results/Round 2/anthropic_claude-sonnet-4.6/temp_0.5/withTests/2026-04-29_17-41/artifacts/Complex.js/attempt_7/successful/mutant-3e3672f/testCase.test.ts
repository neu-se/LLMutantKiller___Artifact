import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex uppercase I parsing", () => {
  it("should parse 'I' alone as the imaginary unit with value i", () => {
    const c = new Complex("I");
    expect(c.re).toBe(0);
    expect(c.im).toBe(1);
  });
});