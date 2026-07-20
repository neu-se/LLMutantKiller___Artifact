import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse string input identically to numeric input", () => {
    const fromString = new Complex("3+4i");
    const fromNumbers = new Complex(3, 4);
    expect(fromString.re).toBe(fromNumbers.re);
    expect(fromString.im).toBe(fromNumbers.im);
    expect(fromString.equals(fromNumbers)).toBe(true);
    // Test that a Complex created from string can be used as input to parse
    // In original, z[""] gets set via chained assignment
    // In mutated, z[""] gets set directly - but when this z object is passed
    // back through parse as an object, the 'im' in a && 're' in a check applies
    const reused = new Complex(fromString);
    expect(reused.re).toBe(3);
    expect(reused.im).toBe(4);
  });
});