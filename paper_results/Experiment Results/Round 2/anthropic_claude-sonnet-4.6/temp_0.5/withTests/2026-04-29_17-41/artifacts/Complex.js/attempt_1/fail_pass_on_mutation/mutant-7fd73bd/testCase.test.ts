import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log function", () => {
  it("should correctly compute log of a complex number with negative real part and zero imaginary part", () => {
    // log(-1) = i*pi
    const result = new Complex(-1, 0).log();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI, 10);
    
    // log(2+3i): logHypot(2,3) = log(sqrt(13))/2, atan2(3,2)
    const result2 = new Complex(2, 3).log();
    expect(result2.re).toBeCloseTo(Math.log(Math.sqrt(13)), 10);
    expect(result2.im).toBeCloseTo(Math.atan2(3, 2), 10);
  });
});