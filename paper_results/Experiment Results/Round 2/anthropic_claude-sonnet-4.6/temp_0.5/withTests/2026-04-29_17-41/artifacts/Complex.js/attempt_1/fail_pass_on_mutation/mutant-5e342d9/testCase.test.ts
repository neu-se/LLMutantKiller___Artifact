import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs with large values", () => {
  it("should correctly compute abs for large complex numbers where re >= im", () => {
    // Use large values where a >= b (both >= 3000) to trigger the hypot large-number path
    // With re=4000, im=3000: a=4000, b=3000, a >= b
    // Original: b_ratio = a/b = 4000/3000 = 4/3, result = a * sqrt(1 + (4/3)^2) = 4000 * sqrt(1 + 16/9) = 4000 * sqrt(25/9) = 4000 * 5/3 = 20000/3
    // Mutated: b_ratio = a*b = 4000*3000 = 12000000, result would be very different
    const c = new Complex(4000, 3000);
    const expected = 5000; // 3-4-5 triangle scaled by 1000
    expect(c.abs()).toBeCloseTo(expected, 5);
  });
});