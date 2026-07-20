import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec', () => {
  it('should return Infinity real part when a is nonzero and d underflows to zero', () => {
    // Use a very small number where a*a + b*b underflows to 0
    const tiny = 5e-324; // Number.MIN_VALUE
    const c = new Complex(tiny, 0);
    const result = c.asec();
    // Original: a/0 = Infinity, so result should have Infinity component
    // Mutated: a*0 = 0, so result would be different
    expect(result.re).toBe(Infinity);
  });
});