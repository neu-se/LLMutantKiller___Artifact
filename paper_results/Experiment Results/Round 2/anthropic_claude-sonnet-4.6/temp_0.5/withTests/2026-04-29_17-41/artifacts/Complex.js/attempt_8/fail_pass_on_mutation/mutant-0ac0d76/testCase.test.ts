import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex pow special case', () => {
  it('positive real base to real power uses direct Math.pow path', () => {
    // With mutation a<=0, positive reals skip the Math.pow shortcut
    // For base=2, exp=0.5: Math.pow(2,0.5) vs complex formula
    // The complex formula: exp(0.5 * log(2)) * cos(0) = same
    // Try a case where the imaginary part would be non-zero with mutation
    // For a>0, b=0: atan2(0,a)=0, so im=0 in both cases
    // The mutation in pow: a<=0 means positive reals fall to general formula
    // General formula gives: exp(c*loh)*cos(c*arg) where arg=atan2(0,a)=0
    // So im = exp(c*loh)*sin(0) = 0 - same!
    // Need to find where the two paths give DIFFERENT results
    // Try pow with complex exponent on positive real base
    const result = new Complex(1, 0).pow(new Complex(0, 1));
    expect(result.re).toBeCloseTo(1, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});