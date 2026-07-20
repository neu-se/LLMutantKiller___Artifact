import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('acsc fallback branch: tiny a with tiny positive b gives different result than tiny a with tiny negative b', () => {
    // With a=5e-324, b=5e-324: d=0, a!=0, b!=0
    // Original: new Complex(+Inf, -Inf).asin()
    // Mutated:  new Complex(+Inf, +Inf).asin()
    // With a=5e-324, b=-5e-324: d=0, a!=0, b!=0  
    // Original: new Complex(+Inf, +Inf).asin()
    // Mutated:  new Complex(+Inf, -Inf).asin()
    // So swapping b sign swaps which version gets which asin input
    // The key: are asin(+Inf, -Inf) and asin(+Inf, +Inf) different?
    // Let's check by computing them directly
    const r1 = new Complex(Infinity, -Infinity).asin();
    const r2 = new Complex(Infinity, Infinity).asin();
    // If they differ, then acsc(tiny, tiny) should differ between original and mutated
    const acscResult = new Complex(5e-324, 5e-324).acsc();
    // Original gives asin(+Inf, -Inf), mutated gives asin(+Inf, +Inf)
    expect(acscResult.re).toEqual(r1.re);
    expect(acscResult.im).toEqual(r1.im);
  });
});