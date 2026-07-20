import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex constructor", () => {
  it("should have re=0 when constructed with null", () => {
    const c = new Complex(null);
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
    expect(c.add(1).re).toBe(1);
    expect(c.add(1).im).toBe(0);
  });
});