import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex div", () => {
  it("correctly divides complex numbers when |c| >= |d| (else branch in div)", () => {
    // Divide (3 + 4i) by (4 + 2i)
    // Expected: (3+4i)/(4+2i) = (3+4i)(4-2i)/20 = (12+8+i(16-6))/20 = (20+10i)/20 = 1 + 0.5i
    // In the div else branch: c=4, d=2, x=d/c=0.5, t=d/x+c=4+4=8
    // Original re: (a + b*x)/t = (3 + 4*0.5)/8 = 5/8 = 0.625 -- WRONG, let me recheck
    // Actually the formula is different from standard, let me verify by running
    const result = new Complex(3, 4).div(new Complex(4, 2));
    expect(result.re).toBeCloseTo(1.0, 10);
    expect(result.im).toBeCloseTo(0.5, 10);
  });
});