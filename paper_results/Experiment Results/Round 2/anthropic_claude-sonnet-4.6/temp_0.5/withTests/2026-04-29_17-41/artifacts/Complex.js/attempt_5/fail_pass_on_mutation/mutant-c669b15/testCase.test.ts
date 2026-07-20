import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("divides with equal magnitude divisor components", () => {
    // c=1, d=-1: |c|===|d|
    // Original (else): x=-1, t=2, re=(1+2*(-1))/2=-0.5, im=(2-1*(-1))/2=1.5
    // Mutated (if): x=-1, t=-2, re=(1*(-1)+2)/(-2)=-0.5, im=(2*(-1)-1)/(-2)=1.5
    const result = new Complex(1, 2).div(new Complex(1, -1));
    expect(result.re).toBe(-0.5);
    expect(result.im).toBe(1.5);
  });
});