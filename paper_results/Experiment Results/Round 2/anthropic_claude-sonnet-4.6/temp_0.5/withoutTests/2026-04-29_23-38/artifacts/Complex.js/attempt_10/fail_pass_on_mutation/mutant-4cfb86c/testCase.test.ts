import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acot', () => {
  it('acot(0 + tiny*i) should equal atan(inverse(0 + tiny*i)) via mathematical identity', () => {
    // For z = 0 + 1e-200i, 1/z has d=0 giving Complex(0, -Infinity)
    // acot(z) should equal atan(1/z) = atan(0, -Infinity)
    // Original computes atan(0, -Infinity) directly (same as identity)
    // Mutated computes atan(NaN, -Infinity) which differs
    const z = new Complex(0, 1e-200);
    const acotResult = z.acot();
    const atanOfInverse = z.inverse().atan();
    // Both should give the same result (both NaN, or both same value)
    expect(acotResult.re).toEqual(atanOfInverse.re);
    expect(acotResult.im).toEqual(atanOfInverse.im);
  });
});