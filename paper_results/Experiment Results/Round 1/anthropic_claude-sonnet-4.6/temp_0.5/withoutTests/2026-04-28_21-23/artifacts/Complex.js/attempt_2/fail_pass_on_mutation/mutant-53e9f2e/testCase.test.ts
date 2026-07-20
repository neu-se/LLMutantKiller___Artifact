import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should correctly compute atanh for a purely imaginary number", () => {
    // atanh(i) = i * pi/4
    // For z = 0 + 1i: atanh(i) should have re=0, im=pi/4
    const result = new Complex(0, 1).atanh();

    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI / 4, 10);
  });
});