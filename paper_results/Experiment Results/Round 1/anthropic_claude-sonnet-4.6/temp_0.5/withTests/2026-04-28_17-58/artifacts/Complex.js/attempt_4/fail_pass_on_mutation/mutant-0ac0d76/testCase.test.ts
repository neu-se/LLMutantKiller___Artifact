import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow", () => {
  it("should correctly compute pow of positive real base with real exponent", () => {
    // (2)^3 = 8, original: b===0 && a>0 returns Math.pow(2,3)=8
    // mutated: b===0 && a<=0 is false for a=2, takes different path
    const result = new Complex(2, 0).pow(new Complex(3, 0));
    expect(result.re).toBeCloseTo(8, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});