import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex div", () => {
  it("should use correct branch for division when |c| equals |d|", () => {
    // Try c=5, d=5: |c|===|d|
    // Original (else): x=1, t=10, re=(a+b)/10, im=(b-a)/10
    // Mutated (if): x=1, t=10, re=(a+b)/10, im=(b-a)/10
    // Try c=5, d=-5: |c|===|d|  
    // With a=3, b=4:
    // Original (else): x=-1, t=10, re=(3-4)/10=-0.1, im=(4+3)/10=0.7
    // Mutated (if): x=-1, t=-10, re=(-3+4)/(-10)=-0.1, im=(-4-3)/(-10)=0.7
    const result = new Complex(3, 4).div(new Complex(5, -5));
    expect(result.re).toBe(-0.1);
    expect(result.im).toBe(0.7);
  });
});