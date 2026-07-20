import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should compute acoth with correct imaginary sign for a complex number", () => {
    // acoth(c) = log((c+1) / (c-1)) / 2
    // For c = 2 + 1i, the imaginary part of the result should have a specific sign
    // The mutation changes -b/d to +b/d in the atanh call inside acoth
    // This affects the imaginary component passed to atanh
    
    const c = new Complex(2, 1);
    const result = c.acoth();
    
    // The correct value of acoth(2+i) can be computed as:
    // acoth(z) = atanh(1/z) = atanh(z_conj / |z|^2)
    // For z = 2+i: d = 4+1 = 5, so 1/z = 2/5 - i/5
    // With original code: new Complex(a/d, -b/d).atanh() = new Complex(2/5, -1/5).atanh()
    // With mutated code: new Complex(a/d, +b/d).atanh() = new Complex(2/5, +1/5).atanh()
    
    // atanh(2/5 - i/5) should have a negative imaginary part
    // atanh(2/5 + i/5) should have a positive imaginary part
    // These are complex conjugates, so the imaginary parts will differ in sign
    
    const expected = new Complex(2 / 5, -1 / 5).atanh();
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
    
    // Explicitly verify the imaginary part sign is negative (not positive as in mutation)
    const mutatedExpected = new Complex(2 / 5, 1 / 5).atanh();
    expect(result.im).not.toBeCloseTo(mutatedExpected.im, 5);
  });
});