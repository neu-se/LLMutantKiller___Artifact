import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch with imaginary part", () => {
  it("should correctly compute acsch for a complex number with non-zero imaginary part", () => {
    // When b !== 0, acsch should use the general formula via asinh
    // The mutation changes `if (b === 0)` to `if (true)`, which means
    // the real-only branch is always taken, even for complex inputs.
    // For z = 1 + i, acsch should give a complex result via the general path.
    const z = new Complex(1, 1);
    const result = z.acsch();

    // Expected: acsch(1+i) computed via the general formula
    // acsch(c) = asinh(1/c) where 1/c = (1-i)/2 = 0.5 - 0.5i
    // The result should have a non-trivial imaginary part
    // With the mutation, it would use Math.log(a + sqrt(a^2+1)) ignoring b,
    // giving acsch(1+i) ≈ log(1 + sqrt(2)) ≈ 0.8814, 0
    // With original code, it goes through asinh path giving a complex result

    // The imaginary part should be non-zero for z = 1 + i
    expect(result.im).not.toBeCloseTo(0, 10);
  });
});