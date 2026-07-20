import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec function", () => {
  it("should use the real part of the complex number when computing asec", () => {
    // asec(2 + 1i): with correct code, a = 2; with mutated code, a = undefined
    // d = a*a + b*b = 4 + 1 = 5 (correct) vs d = undefined (mutated)
    // The result will differ significantly
    const c = new Complex(2, 1);
    const result = c.asec();
    
    // Compute expected: asec(2+i) = acos(1/(2+i)) = acos((2-i)/5) = acos(0.4 - 0.2i)
    const expected = new Complex(0.4, -0.2).acos();
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});