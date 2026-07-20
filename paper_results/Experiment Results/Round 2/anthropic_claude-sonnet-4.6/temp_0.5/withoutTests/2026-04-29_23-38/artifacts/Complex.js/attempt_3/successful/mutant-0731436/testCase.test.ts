import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec", () => {
  it("asec with tiny imaginary value where d underflows should differ from acos(0)", () => {
    const c = new Complex(0, Number.MIN_VALUE);
    const result = c.asec();
    // Original: d=0, b!=0 => Complex(0, -Infinity).acos() - result differs from acos(0)=PI/2
    // Mutated: d=0, always 0 => Complex(0, 0).acos() = PI/2
    // So in original, result.re should NOT be PI/2
    expect(result.re).not.toBeCloseTo(Math.PI / 2, 5);
  });
});