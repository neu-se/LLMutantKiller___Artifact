import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with uppercase I", () => {
  it("should correctly parse a complex number string using uppercase I as the imaginary unit", () => {
    const c = new Complex("2+3I");
    expect(c.re).toBeCloseTo(2, 10);
    expect(c.im).toBeCloseTo(3, 10);
  });
});