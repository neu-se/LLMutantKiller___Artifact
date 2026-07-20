import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.log", () => {
  it("should correctly compute log for positive real numbers and handle edge cases", () => {
    const positive = new Complex(1, 0);
    const result = positive.log();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);

    const positive2 = new Complex(2, 0);
    const result2 = positive2.log();
    expect(result2.re).toBeCloseTo(Math.log(2));
    expect(result2.im).toBeCloseTo(0);
  });
});