import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with minus sign", () => {
  it("should correctly parse a negative imaginary part like '3-2i'", () => {
    const c = new Complex("3-2i");
    expect(c.re).toBeCloseTo(3);
    expect(c.im).toBeCloseTo(-2);
  });
});