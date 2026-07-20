import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString", () => {
  it("should not add minus sign for pure imaginary -0", () => {
    const saved = Complex['EPSILON'];
    Complex['EPSILON'] = -1; // disable epsilon zeroing
    const c = new Complex(0, -0);
    // Now: a=0, b=-0
    // EPSILON check: Math.abs(-0)=0 < -1 → false, b stays -0
    // b === 0: -0 === 0 → TRUE in JS → early return "0"
    const result = c.toString();
    Complex['EPSILON'] = saved;
    expect(result).toBe("0");
  });
});