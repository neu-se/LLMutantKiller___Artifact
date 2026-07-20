import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number construction", () => {
  it("should correctly parse a string complex number", () => {
    const c = new Complex("2+3i");
    expect(c.re).toBe(2);
    expect(c.im).toBe(3);
  });
});