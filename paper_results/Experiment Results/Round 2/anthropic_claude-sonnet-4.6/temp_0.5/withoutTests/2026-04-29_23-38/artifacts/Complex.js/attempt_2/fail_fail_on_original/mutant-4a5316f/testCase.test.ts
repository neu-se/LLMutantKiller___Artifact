import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should compute acoth with correct sign when d underflows to zero", () => {
    // Use very small values so that a*a + b*b underflows to 0
    // but b != 0, triggering the fallback branch
    // Original: new Complex(a/0, -b/0).atanh() => new Complex(Infinity, -Infinity).atanh()
    // Mutated:  new Complex(a/0, +b/0).atanh() => new Complex(Infinity, +Infinity).atanh()
    const a = 5e-200;
    const b = 5e-200;
    const result = new Complex(a, b).acoth();
    
    // With original code: im part of atanh(Infinity - Infinity*i)
    // With mutated code:  im part of atanh(Infinity + Infinity*i)
    // These should differ in sign of imaginary part
    const resultNegB = new Complex(a, -b).acoth();
    
    // The result for (a, b) and (a, -b) should be conjugates (negated im)
    // Original preserves this symmetry; mutation breaks it
    expect(result.im).toBeCloseTo(-resultNegB.im, 5);
  });
});