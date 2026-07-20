import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("parses string form and returns correct complex number that passes equality check", () => {
    const fromString = new Complex("2+3i");
    const fromNumbers = new Complex(2, 3);
    expect(fromString.equals(fromNumbers)).toBe(true);
    expect(fromString.re).toBe(2);
    expect(fromString.im).toBe(3);
    expect(fromString.isNaN()).toBe(false);
    expect(fromString.isZero()).toBe(false);
  });
});