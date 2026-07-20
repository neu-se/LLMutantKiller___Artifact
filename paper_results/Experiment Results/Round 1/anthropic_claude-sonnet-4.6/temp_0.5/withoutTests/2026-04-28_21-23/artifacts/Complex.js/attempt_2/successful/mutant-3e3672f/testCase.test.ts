import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with uppercase I imaginary unit", () => {
  it("should correctly parse a complex number string using uppercase I as the imaginary unit after a minus sign", () => {
    const c = new Complex("3-I");
    expect(c.re).toBe(3);
    expect(c.im).toBe(-1);
  });
});