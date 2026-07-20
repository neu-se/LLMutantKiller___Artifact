import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asinh", () => {
  it("should not mutate the original complex number's im property after asinh call", () => {
    // The mutation changes this['im'] = tmp to this[""] = tmp
    // This means after asinh(), the original object's 'im' is NOT restored
    // In the original: this.im is restored to its original value
    // In the mutant: this.im remains as whatever it was set to during computation
    
    const z = new Complex(1, 2);
    const originalIm = z.im;
    
    // Call asinh - in the mutant, this modifies z.im and doesn't restore it
    z.asinh();
    
    // After asinh(), the original object should have its im restored
    // In the mutant, z.im will be wrong (it was set to -z.re = -1 and never restored)
    expect(z.im).toBe(originalIm);
  });
});