import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log via asin", () => {
  it("should compute asin correctly for value 2 (outside [-1,1])", () => {
    // asin(2) = pi/2 - i*log(2 + sqrt(3))
    const result = new Complex(2, 0).asin();
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBeCloseTo(-Math.log(2 + Math.sqrt(3)), 10);
  });
});