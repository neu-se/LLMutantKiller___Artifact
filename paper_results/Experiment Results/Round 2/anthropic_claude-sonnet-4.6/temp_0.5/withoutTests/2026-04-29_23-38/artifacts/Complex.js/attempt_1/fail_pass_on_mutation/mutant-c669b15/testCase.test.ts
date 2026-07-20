import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("should correctly divide complex numbers when |c| equals |d|", () => {
    // Dividing (1 + 3i) by (2 + 2i) where |c| = |d| = 2
    // This tests the boundary condition between the two branches
    const a = new Complex(1, 3);
    const b = new Complex(2, 2);
    const result = a.div(b);
    
    // (1 + 3i) / (2 + 2i) = (1+3i)(2-2i) / ((2+2i)(2-2i))
    // = (2 - 2i + 6i - 6i^2) / (4 + 4)
    // = (2 + 4i + 6) / 8
    // = (8 + 4i) / 8
    // = 1 + 0.5i
    expect(result.re).toBeCloseTo(1, 10);
    expect(result.im).toBeCloseTo(0.5, 10);
  });
});