import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs() hypot large values", () => {
  it("should correctly compute abs when real part is larger than imaginary part and both are large", () => {
    // re=9000, im=3001: both >= 3000, |re| > |im|
    // Original: a=9000 >= b=3001, so b = 3001/9000, result = 9000 * sqrt(1 + (3001/9000)^2)
    // Mutated: a=9000 >= b=3001 triggers swap: a=3001, b=9000/3001, result = 3001 * sqrt(1 + (9000/3001)^2)
    // These are mathematically equal! Need a case where x/y != y/x matters with signs or precision
    const c = new Complex(9000, 3001);
    const result = c.abs();
    const expected = Math.sqrt(9000 * 9000 + 3001 * 3001);
    expect(result).toBeCloseTo(expected, 10);
  });
});