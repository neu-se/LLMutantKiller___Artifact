import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs with large values triggering hypot large-number branch", () => {
  it("should return 5000 for complex number 3000 + 4000i", () => {
    const c = new Complex(3000, 4000);
    const result = c.abs();
    // hypot(3000, 4000): a=3000, b=4000, a<b so branch taken
    // original: b = 4000/3000, result = 4000*sqrt(1+(4/3)^2) = 5000
    // mutated: b = 4000*3000 = 12000000, result = 4000*sqrt(1+144e12) >> 5000
    expect(result).toBe(5000);
  });
});