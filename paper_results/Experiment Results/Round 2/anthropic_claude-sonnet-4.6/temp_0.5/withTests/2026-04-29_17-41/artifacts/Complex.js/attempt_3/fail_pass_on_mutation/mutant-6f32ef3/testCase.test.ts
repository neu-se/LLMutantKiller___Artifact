import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString", () => {
  it("should not add minus sign for pure imaginary with b = -0 when epsilon is 0", () => {
    const savedEpsilon = Complex['EPSILON'];
    Complex['EPSILON'] = 0; // disable epsilon zeroing
    const c = new Complex(0, -0);
    const result = c.toString();
    Complex['EPSILON'] = savedEpsilon;
    // b = -0, a = 0
    // EPSILON check: Math.abs(-0) = 0 < 0 → false, b stays -0
    // b === 0 → -0 === 0 → true → early return "0"
    expect(result).toBe("0");
  });
});