import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with uppercase I", () => {
  it("should correctly parse complex numbers with uppercase I as imaginary unit", () => {
    const c = new Complex("3+2I");
    expect(c.re).toBe(3);
    expect(c.im).toBe(2);
  });
});