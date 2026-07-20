import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('detects mutation when a*a underflows but a is nonzero', () => {
    const a = Number.MIN_VALUE;
    const b = 0;
    const d = a * a + b * b;
    expect(d).toBe(0);
    expect(a).not.toBe(0);
    
    const result = new Complex(a, b).acsc();
    // Original: new Complex(Infinity, 0).asin() → (PI/2, -Infinity)
    // Mutated: new Complex(0, 0).asin() → (0, 0)
    expect(result.im).toBe(-Infinity);
  });
});