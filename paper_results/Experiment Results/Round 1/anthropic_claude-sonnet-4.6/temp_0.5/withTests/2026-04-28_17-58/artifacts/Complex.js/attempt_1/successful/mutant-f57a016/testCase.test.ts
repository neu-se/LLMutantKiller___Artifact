import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with uppercase I", () => {
  it("should correctly parse a complex number string with uppercase I as imaginary", () => {
    const c = new Complex("3I");
    expect(c.re).toBe(0);
    expect(c.im).toBe(3);
  });
});