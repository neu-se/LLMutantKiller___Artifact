import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex mutation detection', () => {
  it('abs should correctly compute magnitude for large complex numbers', () => {
    // If hypot's && became ||, then for a=4000, b=3:
    // Original (&&): a<3000 && b<3000 = false -> uses overflow-safe path
    // Mutated (||): a<3000 || b<3000 = true -> uses simple sqrt path (may overflow for huge numbers)
    // For a=4000, b=3: both paths give same numeric result, just different precision
    // Need values where one path overflows and other doesn't
    // a = 1e200, b = 1e200: 
    // simple path: sqrt(1e400 + 1e400) = sqrt(2e400) = Infinity (overflow!)
    // safe path: a=1e200 > 3000, b=1e200 > 3000 -> uses safe calculation
    const c = new Complex(1e200, 1e200);
    const result = c.abs();
    expect(result).not.toBe(Infinity);
    expect(result).toBeCloseTo(Math.SQRT2 * 1e200, -190);
  });
});