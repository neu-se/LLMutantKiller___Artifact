import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString", () => {
  it("should format correctly when imaginary part is negative zero with epsilon set to zero", () => {
    const c = new Complex(3, 1);
    (c as any).im = -0;
    const savedEpsilon = (Complex as any).EPSILON;
    (Complex as any).EPSILON = -1; // Make epsilon check never fire
    const result = c.toString();
    (Complex as any).EPSILON = savedEpsilon;
    // b = -0, Math.abs(-0) = 0, 0 < -1 is false → b stays -0
    // b === 0: -0 === 0 is TRUE → early return → "3"
    // Both original and mutated return "3"
    expect(result).toBe("3");
  });
});