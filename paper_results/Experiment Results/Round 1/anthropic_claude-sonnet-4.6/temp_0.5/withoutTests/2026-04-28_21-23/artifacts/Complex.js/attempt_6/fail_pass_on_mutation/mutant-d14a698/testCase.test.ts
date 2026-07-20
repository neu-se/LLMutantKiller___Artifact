import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec', () => {
  it('asec(z) should equal acos(1/z) for a complex number with tiny components causing d underflow', () => {
    // For z = 1e-200 + 1e-200*i, d = z.re^2 + z.im^2 underflows to 0
    // asec uses the else branch: Complex(a/0, -b/0).acos() [original] or Complex(a/0, +b/0).acos() [mutated]
    // The mathematical identity asec(z) = acos(1/z) should hold
    // 1/z for tiny z = Infinity (in some direction)
    // We test that asec gives a consistent result with acos(inverse(z))
    const z = new Complex(1e-200, 1e-200);
    const result = z.asec();
    // inverse of tiny complex number
    const inv = z.inverse(); // should be Complex(Infinity, Infinity) since z is tiny
    const expected = inv.acos();
    expect(result.re).toBe(expected.re);
    expect(result.im).toBe(expected.im);
  });
});