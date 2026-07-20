import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec edge case with underflow', () => {
  it('should return Infinity real part when a is non-zero but d underflows to zero', () => {
    // Use the smallest positive float so that a*a underflows to 0
    // making d = 0, but a !== 0, so original returns a/0 = Infinity
    // while mutant returns a*0 = 0
    const a = 5e-324; // smallest positive double, a*a underflows to 0
    const b = 0;
    const result = new Complex(a, b).asec();
    // Original: (a !== 0) ? a / 0 : 0 => Infinity, leading to acos(Infinity, 0)
    // Mutant: (a !== 0) ? a * 0 : 0 => 0, leading to acos(0, 0)
    expect(result.re).toBe(Math.PI / 2);
  });
});