import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("parses a string number and produces correct real and imaginary parts with no extra properties", () => {
    const c = new Complex("2+3i");
    const keys = Object.getOwnPropertyNames(c);
    expect(keys).toContain("re");
    expect(keys).toContain("im");
    expect(c.re).toBe(2);
    expect(c.im).toBe(3);
    // The parse result only copies re and im to the Complex instance
    // so no "" key should appear on the instance itself
    expect("" in c).toBe(false);
  });
});