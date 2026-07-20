import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atan", () => {
  it("should return (0, -Infinity) for atan(0 - i)", () => {
    const result = new Complex(0, -1).atan();
    expect(result.re).toBe(0);
    expect(result.im).toBe(-Infinity);
  });
});