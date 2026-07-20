import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc function", () => {
  it("should correctly compute the inverse cosecant of a complex number with non-zero imaginary part", () => {
    // acsc(c) = -i * log(i / c + sqrt(1 - 1 / c^2))
    // The mutation changes `a / d` to `a * d` in the real part of the intermediate computation
    // For c = 1 + i, d = a^2 + b^2 = 1 + 1 = 2
    // Original: a/d = 1/2, -b/d = -1/2
    // Mutated: a*d = 2, -b/d = -1/2 (wait, the mutation is on the second line)
    // Actually the mutation is: original `-b / d` -> mutated `-b * d`
    // Wait, let me re-read: the placeholder is the second line of the two-line expression
    // Original: `a / d,\n-b / d`
    // Mutated: `a * d,\n-b * d` -- no wait
    // Original placeholder: `-b / d).asin()`  (this is the imaginary part)
    // Mutated placeholder: `-b * d).asin()`
    // So the real part `a / d` stays the same, but imaginary part changes from `-b/d` to `-b*d`
    
    // For c = 2 + i:
    // d = 4 + 1 = 5
    // Original: new Complex(2/5, -1/5).asin()
    // Mutated: new Complex(2/5, -1*5).asin() = new Complex(0.4, -5).asin()
    
    const c = new Complex(2, 1);
    const result = c.acsc();
    
    // Compute expected value manually: acsc(2+i) = asin(1/(2+i)) = asin((2-i)/5)
    // asin of (2/5 - i/5)
    const expected = new Complex(2/5, -1/5).asin();
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});