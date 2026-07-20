import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("should correctly divide complex numbers where |re(divisor)| >= |im(divisor)|", () => {
    // Dividing (3 + 2i) by (4 + 1i)
    // Expected: (3+2i)/(4+1i) = (3+2i)(4-1i)/((4+1i)(4-1i)) = (12-3i+8i-2i²)/(16+1) = (14+5i)/17
    const result = new Complex(3, 2).div(new Complex(4, 1));
    const expectedRe = 14 / 17;
    const expectedIm = 5 / 17;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});