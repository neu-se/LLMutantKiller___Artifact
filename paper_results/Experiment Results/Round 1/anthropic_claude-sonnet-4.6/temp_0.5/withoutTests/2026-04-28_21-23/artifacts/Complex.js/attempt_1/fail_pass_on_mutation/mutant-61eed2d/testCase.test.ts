import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should correctly parse a complex number string with imaginary part", () => {
    const c = new Complex("3+2i");
    expect(c.im).toBe(2);
    expect(c.re).toBe(3);
  });
});