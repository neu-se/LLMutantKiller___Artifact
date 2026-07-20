import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse a complex number from string representation of toString output", () => {
    // Create a complex number, convert to string, parse back
    const original = new Complex(3, -4);
    const str = original.toString(); // "3 - 4i"
    const parsed = new Complex(str);
    expect(parsed.re).toBe(3);
    expect(parsed.im).toBe(-4);
    expect(parsed.equals(original)).toBe(true);
  });
});