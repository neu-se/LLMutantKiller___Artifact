import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec function", () => {
  it("should correctly compute asec(2) returning acos(0.5) = pi/3", () => {
    // asec(2) = acos(1/2) = pi/3
    // For z = 2 + 0i:
    //   d = a*a - b*b = 4 - 0 = 4 (non-zero)
    // Original: uses (a/d, -b/d).acos() = (0.5, 0).acos() = acos(0.5) = pi/3
    // Mutated: always uses fallback path (false branch), giving wrong result
    const result = new Complex(2, 0).asec();
    const expected = Math.acos(0.5); // pi/3 ≈ 1.0471975511965976
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});