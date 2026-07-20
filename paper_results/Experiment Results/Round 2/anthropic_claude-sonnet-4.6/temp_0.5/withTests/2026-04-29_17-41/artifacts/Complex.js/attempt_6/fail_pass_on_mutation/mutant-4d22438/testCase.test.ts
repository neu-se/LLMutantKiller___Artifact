import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot mutation detection", () => {
  it("correctly computes abs for large complex number where |im| > |re|", () => {
    // hypot(x=4000, y=5000): a=4000, b=5000, a<b
    // a becomes 5000, original b = y/x = 5000/4000 = 1.25
    // original result: 5000*sqrt(1+1.5625) = 5000*1.6008 = 6403.12
    // mutated b = y*x = 5000*4000 = 20000000, result would be enormous
    // correct answer: sqrt(4000^2+5000^2) = sqrt(41000000) ≈ 6403.12
    const c = new Complex(4000, 5000);
    const result = c.abs();
    expect(result).toBeCloseTo(Math.sqrt(4000 * 4000 + 5000 * 5000), 5);
  });
});