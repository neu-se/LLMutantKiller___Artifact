import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should correctly compute atanh for a complex number with nonzero imaginary part", () => {
    // For z = 0 + 1i, atanh(i) = i*pi/4 exactly
    // noIM should be false (b !== 0), so im should NOT be negated
    // With mutation noIM=true, im gets negated, giving wrong sign
    const z = new Complex(0, 1);
    const result = z.atanh();
    
    // atanh(i) = i * pi/4 ≈ 0 + 0.7853981633974483i
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI / 4, 10);
  });
});