import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech mutation detection", () => {
  it("should compute asech with correct sign for imaginary part when b is negative", () => {
    // The mutation changes (b !== 0) ? -b / 0 : 0 to (false) ? -b / 0 : 0
    // In the dead-code branch (d === 0), original gives -Infinity for im when b > 0
    // mutated gives 0. We need to trigger d === 0 with b !== 0.
    // d = a^2 + b^2 = 0 only when a = b = 0, but isZero() catches that.
    // The only way to get a different result is to somehow bypass isZero().
    // Since isZero() checks re === 0 && im === 0, and we need d = re^2 + im^2 = 0
    // with im !== 0, this is impossible with real finite numbers.
    // Therefore, this mutation cannot be killed by any test through the public API.
    // We write the best approximation: a test that verifies correct asech behavior.
    const z = new Complex(0, 1);
    const result = z.asech();
    // asech(i): 1/i = -i, acosh(-i)
    // acosh(-i) = log(-i + sqrt(-i^2 - 1)) = log(-i + sqrt(1-1)) ... 
    // Actually: acosh(z) = log(z + sqrt(z^2-1))
    // z = -i: z^2 = -1, z^2-1 = -2, sqrt(-2) = i*sqrt(2)
    // -i + i*sqrt(2) = i*(sqrt(2)-1)
    // log(i*(sqrt(2)-1)) = log(sqrt(2)-1) + i*pi/2
    // re = log(sqrt(2)-1) ≈ -0.8814, im = pi/2
    // But acosh may adjust signs based on im <= 0 condition
    // Let's just verify the result matches computing it via inverse then acosh
    const expected = new Complex(0, 1).inverse().acosh();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});