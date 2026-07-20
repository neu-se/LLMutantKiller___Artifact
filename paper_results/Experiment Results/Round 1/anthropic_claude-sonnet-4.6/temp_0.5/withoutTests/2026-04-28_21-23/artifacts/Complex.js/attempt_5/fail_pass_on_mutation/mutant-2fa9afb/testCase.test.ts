import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sinh", () => {
  it("sinh of purely imaginary number should have zero real part and non-zero imaginary part", () => {
    // sinh(0 + i*π/2) = i*sin(π/2) = i
    // With mutation if(true), sinh always returns ZERO
    const c = new Complex(0, Math.PI / 2);
    const result = c.sinh();
    
    // sinh(i*π/2) = i * sin(π/2) = i
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(1, 10);
  });
});