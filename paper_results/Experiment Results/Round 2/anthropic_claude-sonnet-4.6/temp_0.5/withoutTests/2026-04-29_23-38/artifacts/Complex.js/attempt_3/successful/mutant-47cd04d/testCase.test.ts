import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex add', () => {
  it('should return INFINITY when adding finite complex to half-infinite complex', () => {
    const finite = new Complex(3, 4);
    const halfInfinite = new Complex(Infinity, 0);
    const result = finite.add(halfInfinite);
    // Original: second check catches z.isInfinite() → returns Complex['INFINITY'] (im=Infinity)
    // Mutated: arithmetic → re=Infinity, im=4
    expect(result['im']).toBe(Infinity);
  });
});