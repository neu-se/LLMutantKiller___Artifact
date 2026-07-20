import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should correctly parse a complex number string with negative uppercase I imaginary unit", () => {
    const c = new Complex("-I");
    expect(c.re).toBeCloseTo(0);
    expect(c.im).toBeCloseTo(-1);
  });
});