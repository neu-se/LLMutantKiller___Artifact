import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex div', () => {
  it('correctly divides when |c| is strictly less than |d|', () => {
    // Use |c| < |d| strictly - both original and mutated use if-branch
    // (1 + 2i) / (1 + 3i): |c|=1, |d|=3, so if-branch
    // x = 1/3, t = 1*(1/3)+3 = 10/3
    // re = (1*(1/3)+2)/(10/3) = (7/3)/(10/3) = 7/10 = 0.7
    // im = (2*(1/3)-1)/(10/3) = (-1/3)/(10/3) = -1/10 = -0.1
    const result = new Complex(1, 2).div(new Complex(1, 3));
    expect(result.re).toBeCloseTo(0.7, 14);
    expect(result.im).toBeCloseTo(-0.1, 14);
  });
});