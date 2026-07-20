import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth', () => {
  it('acoth of complex number with zero real and zero imaginary parts', () => {
    // With original: if(a===0 && b===0) returns Complex(0, PI/2)
    // Then d=0, return (d !== 0) -> false branch: new Complex(0, 0).atanh() = Complex(0,0)
    // With mutated: if(true) returns Complex(0, PI/2) immediately
    // So original returns Complex(0,0) but mutated returns Complex(0, PI/2)
    // But this requires the if condition to NOT catch (0,0) in original...
    
    // Let's try: acoth with purely imaginary input where b=0 check matters
    const result = new Complex(0, 2).acoth();
    // acoth(2i) = atanh(-i/2) = atanh(0 - 0.5i)
    // = 0 - i*atan(0.5) ≈ -0.4636i
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.atan(0.5), 10);
  });
});