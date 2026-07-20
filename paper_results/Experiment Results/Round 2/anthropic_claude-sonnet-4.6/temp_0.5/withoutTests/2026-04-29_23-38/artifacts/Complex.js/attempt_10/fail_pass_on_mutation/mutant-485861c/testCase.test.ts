import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse a complex number from an object with re and im", () => {
    const c = new Complex({ re: 0, im: 0 });
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
    expect(c.isZero()).toBe(true);
    
    // Verify null gives same result as explicit zero object
    const d = new Complex(null);
    expect(d.re).toBe(c.re);
    expect(d.im).toBe(c.im);
  });
});