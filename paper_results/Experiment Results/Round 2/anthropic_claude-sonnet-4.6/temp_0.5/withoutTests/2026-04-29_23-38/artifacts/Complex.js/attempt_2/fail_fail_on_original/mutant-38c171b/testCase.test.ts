import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should correctly compute acsch for a complex number where d underflows to zero with non-zero imaginary part", () => {
    // When a=0 and b is very small, d = a*a + b*b underflows to 0
    // In this case the fallback branch is used
    // Original: (b !== 0) ? -b / 0 : 0 => -Infinity (since b > 0, -b/0 = -Infinity)
    // Mutated:  (false) ? -b / 0 : 0   => 0
    const tiny = 5e-324; // Number.MIN_VALUE
    const c = new Complex(0, tiny);
    const result = c.acsch();
    // With original code: imaginary part of fallback is -Infinity, so asinh(-Infinity*i) gives non-zero im
    // With mutated code: imaginary part is 0, giving different result
    expect(result.im).toBe(-Math.PI / 2);
  });
});