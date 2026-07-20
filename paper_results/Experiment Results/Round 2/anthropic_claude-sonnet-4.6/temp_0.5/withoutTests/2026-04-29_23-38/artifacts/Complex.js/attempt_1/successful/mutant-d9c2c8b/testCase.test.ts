import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should correctly compute atanh of a complex number", () => {
    // atanh(0.5 + 0.5i) should give a specific result
    // The mutation changes division by 2 to multiplication by 2 in the imaginary part
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    
    // Known correct value: atanh(0.5 + 0.5i)
    // re = 0.40235947810852507
    // im = 0.5535743588970452
    expect(result.re).toBeCloseTo(0.40235947810852507, 10);
    expect(result.im).toBeCloseTo(0.5535743588970452, 10);
  });
});