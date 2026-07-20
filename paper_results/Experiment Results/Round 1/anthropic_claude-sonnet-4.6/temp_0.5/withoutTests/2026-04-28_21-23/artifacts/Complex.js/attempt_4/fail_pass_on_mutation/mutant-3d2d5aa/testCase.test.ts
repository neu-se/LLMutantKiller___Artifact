import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth', () => {
  it('detects mutation in acoth fallback with non-zero b and tiny a', () => {
    // Need d = a*a + b*b = 0 but a !== 0
    // Use tiny a and tiny b such that both square to 0
    const tiny = 5e-324;
    const c = new Complex(tiny, tiny);
    const result = c.acoth();
    // Original: first arg = (a !== 0) ? a/0 : 0 = Infinity
    // Mutant: first arg = (false) ? -b/0 : 0 = 0
    // These lead to different atanh results
    // Original atanh(Infinity, -Infinity) vs mutant atanh(0, -Infinity)
    expect(isNaN(result.re) || isNaN(result.im)).toBe(true);
  });
});