import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with standalone uppercase I", () => {
  it("should correctly parse a complex number string with standalone uppercase I as imaginary unit", () => {
    const c = new Complex("3+I");
    expect(c.re).toBe(3);
    expect(c.im).toBe(1);
  });
});