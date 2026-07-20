import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex pow mutation test', () => {
  it('pow with complex base having both real and imaginary parts should give correct result', () => {
    // (1+i)^2 = 2i, not a real number
    // If mutation is in pow: b=1 != 0, a=1 > 0, so with || it returns Math.pow(1,2)=1 incorrectly
    const z = new Complex(1, 1);
    const result = z.pow(2);
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(2, 10);
  });
});