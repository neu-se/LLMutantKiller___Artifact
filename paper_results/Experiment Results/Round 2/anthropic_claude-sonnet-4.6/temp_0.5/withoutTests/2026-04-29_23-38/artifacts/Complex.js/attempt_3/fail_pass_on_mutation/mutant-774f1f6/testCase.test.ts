import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number construction with two arguments", () => {
  it("should correctly set re and im when two numeric arguments are provided", () => {
    const c = new Complex(3, 4);
    expect(c.re).toBe(3);
    expect(c.im).toBe(4);
  });
});