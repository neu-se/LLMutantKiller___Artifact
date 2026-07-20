import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("divides correctly when divisor components have equal absolute values", () => {
    const result = new Complex(3, 4).div(new Complex(1, 1));
    expect(result.re).toBe(3.5);
    expect(result.im).toBe(0.5);
  });
});