import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asinh", () => {
  it("should correctly compute asinh of a purely imaginary number", () => {
    // For z = 0 + 2i:
    // asinh(2i) = log(2i + sqrt(1 - 4)) = log(2i + sqrt(-3)) = log(2i + i*sqrt(3))
    // = log(i*(2 + sqrt(3))) = i*pi/2 + log(2 + sqrt(3))
    // ≈ 0 + 1.5707963...i  ... actually asinh(2i) = i * asin(2) which is complex
    // The real part should be 0 for purely imaginary input
    const c = new Complex(0, 2);
    const result = c.asinh();
    
    // asinh(2i): real part should be 0, imaginary part should be asin(2) related
    // For z = bi (purely imaginary), asinh(bi) = i*asin(b) when |b| <= 1
    // For b=2: asinh(2i) = i*pi/2 + log(2 + sqrt(3)) approximately
    // Actually asinh(2i) ≈ 1.3169578969 + 1.5707963268i
    expect(result.re).toBeCloseTo(1.3169578969248166, 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});