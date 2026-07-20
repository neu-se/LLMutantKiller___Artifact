import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should return a valid complex number for a real input greater than 1", () => {
    const result = new Complex(2, 0).asec();
    // asec(2) = acos(1/2) = PI/3
    expect(result).toBeDefined();
    expect(result.re).toBeCloseTo(Math.PI / 3, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});