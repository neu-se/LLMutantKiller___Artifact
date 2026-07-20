import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acot', () => {
  it('detects mutation: acot with tiny imaginary part causing d to underflow to 0', () => {
    const tiny = 5e-324;
    const result = new Complex(0, tiny).acot();
    // Original: d=0, b!==0 => new Complex(0, -Infinity).atan()
    // atan checks b===-1, but b=-Infinity, so goes through d calculation
    // d = 0*0 + (1-(-Inf))*(1-(-Inf)) = Infinity, so t1 = new Complex(...).log()
    // Mutated: new Complex(0, 0).atan() = Complex(0,0)
    // The key difference: original result should be infinite or have large im
    expect(result.isInfinite()).toBe(true);
  });
});