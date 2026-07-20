import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atan function", () => {
  it("should return (0, Infinity) when computing atan of (0, 1)", () => {
    const result = new Complex(0, 1).atan();
    expect(result.re).toBe(0);
    expect(result.im).toBe(Infinity);
  });
});