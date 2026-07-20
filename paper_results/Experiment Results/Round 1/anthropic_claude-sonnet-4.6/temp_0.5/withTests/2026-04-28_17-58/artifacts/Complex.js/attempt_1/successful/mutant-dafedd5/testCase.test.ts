import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex ceil method", () => {
  it("should ceil the real part correctly when places is specified", () => {
    // With places=2, original uses Math.pow(10, 2)=100, so ceil(3.14159 * 100)/100 = 3.15
    // Mutated code uses Math.pow(10, false)=1, so ceil(3.14159 * 1)/1 = 4
    const c = new Complex(3.14159, 2.71828);
    const result = c.ceil(2);
    
    // Original: places = Math.pow(10, 2) = 100
    // re: Math.ceil(3.14159 * 100) / 100 = Math.ceil(314.159) / 100 = 315 / 100 = 3.15
    // im: Math.ceil(2.71828 * 100) / 100 = Math.ceil(271.828) / 100 = 272 / 100 = 2.72
    expect(result.re).toBeCloseTo(3.15, 10);
    expect(result.im).toBeCloseTo(2.72, 10);
  });
});