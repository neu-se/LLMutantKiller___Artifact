import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc method", () => {
  it("should return correct acsc for a complex number where a=0 and b=0 (zero input)", () => {
    // When a=0 and b=0, acsc returns Complex(PI/2, Infinity) via early return
    // This tests the path that avoids the mutated code
    const result = new Complex(0, 0).acsc();
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBe(Infinity);

    // Test a normal non-zero input to verify acsc works correctly
    // acsc(2) = asin(1/2) = PI/6
    const result2 = new Complex(2, 0).acsc();
    expect(result2.re).toBeCloseTo(Math.PI / 6, 10);
    expect(result2.im).toBeCloseTo(0, 10);

    // Test with purely imaginary input to exercise the +b/d path (not -b/d)
    // acsc(i) should use the +b/d branch since b > 0
    // For z = i: d = 0 + 1 = 1, so new Complex(0/1, +1/1).asin() = new Complex(0, 1).asin()
    const result3 = new Complex(0, 1).acsc();
    // asin(i) = -i * log(i*i + sqrt(1 - i^2)) = -i * log(-1 + sqrt(2))
    // Expected: re = 0, im = -log(1 + sqrt(2))
    const expected_im = -Math.log(1 + Math.sqrt(2));
    expect(result3.re).toBeCloseTo(0, 10);
    expect(result3.im).toBeCloseTo(expected_im, 10);
  });
});