import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log", () => {
  it("log of purely imaginary number i should return pi/2 imaginary part", () => {
    const c = new Complex(0, 1);
    const result = c.log();
    expect(result.re).toBeCloseTo(0, 15);
    expect(result.im).toBeCloseTo(Math.PI / 2, 15);
  });
});