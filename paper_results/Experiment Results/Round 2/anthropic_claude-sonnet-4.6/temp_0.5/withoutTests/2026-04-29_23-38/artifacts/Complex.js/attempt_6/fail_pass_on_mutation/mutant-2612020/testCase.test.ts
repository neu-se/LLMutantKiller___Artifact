import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should have im=0 when parsing a purely real string", () => {
    // If the mutation causes z['im'] to not be initialized to 0,
    // then parsing "5" would give im=NaN or undefined
    const c = new Complex("5");
    expect(c.im).toBe(0);
    expect(c.re).toBe(5);
    expect(isNaN(c.im)).toBe(false);
    expect(isNaN(c.re)).toBe(false);
    // Verify the number is usable
    expect(c.add(new Complex(0, 1)).im).toBe(1);
    expect(c.add(new Complex(0, 1)).re).toBe(5);
  });
});