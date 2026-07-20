import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsch', () => {
  it('acsch of a number where a equals b gives correct result matching inverse formula', () => {
    // For z = 1+i, d = a^2 - b^2 = 0
    // Original second branch: new Complex((1!==0)?1/0:0, (1!==0)?-1/0:0).asinh()
    // Mutated first branch: new Complex(1/0, -1/0).asinh()
    // Both seem equivalent - but let's check the actual computed value
    // matches what acsc-style inverse gives
    const z = new Complex(2, 2);
    const result = z.acsch();
    // acsch(2+2i) via correct formula: asinh(1/(2+2i)) = asinh((2-2i)/8) = asinh(0.25-0.25i)
    const correct = new Complex(0.25, -0.25).asinh();
    expect(result.re).toBeCloseTo(correct.re, 8);
    expect(result.im).toBeCloseTo(correct.im, 8);
  });
});