import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex div', () => {
  it('correctly divides complex numbers when |c| >= |d|', () => {
    // (3 + 4i) / (2 + 1i)
    // Expected: (3*2 + 4*1)/(2^2+1^2) + i*(4*2 - 3*1)/(2^2+1^2)
    //         = (6+4)/5 + i*(8-3)/5 = 2 + i
    const result = new Complex(3, 4).div(new Complex(2, 1));
    expect(result.re).toBeCloseTo(2, 10);
    expect(result.im).toBeCloseTo(1, 10);
  });
});