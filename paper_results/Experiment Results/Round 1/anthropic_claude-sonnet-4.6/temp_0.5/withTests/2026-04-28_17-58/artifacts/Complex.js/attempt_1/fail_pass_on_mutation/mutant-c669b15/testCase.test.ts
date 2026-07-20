import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division when |c| equals |d|", () => {
  it("should correctly divide complex numbers when divisor has equal magnitude real and imaginary parts", () => {
    // Divide (3 + 4i) by (2 - 2i)
    // Here |c| = |d| = 2, so the mutation changes which branch is taken
    const result = new Complex(3, 4).div(new Complex(2, -2));
    
    // Expected: (3 + 4i) / (2 - 2i) = (3 + 4i)(2 + 2i) / ((2-2i)(2+2i))
    // = (6 + 6i + 8i + 8i^2) / (4 + 4)
    // = (6 - 8 + 14i) / 8
    // = (-2 + 14i) / 8
    // = -0.25 + 1.75i
    expect(result.re).toBeCloseTo(-0.25, 10);
    expect(result.im).toBeCloseTo(1.75, 10);
  });
});