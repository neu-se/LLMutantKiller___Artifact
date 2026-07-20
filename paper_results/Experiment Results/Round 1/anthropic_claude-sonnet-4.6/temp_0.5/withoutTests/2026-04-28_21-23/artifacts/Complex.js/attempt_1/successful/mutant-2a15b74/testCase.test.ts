import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("correctly divides complex numbers when |re| >= |im| of divisor", () => {
    // Divide (3 + 4i) / (4 + 2i)
    // Manual: (3+4i)(4-2i) / (16+4) = (12+8 + i(16-6)) / 20 = (20 + 10i) / 20 = 1 + 0.5i
    const result = new Complex(3, 4).div(new Complex(4, 2));
    expect(result.re).toBeCloseTo(1, 10);
    expect(result.im).toBeCloseTo(0.5, 10);
  });
});