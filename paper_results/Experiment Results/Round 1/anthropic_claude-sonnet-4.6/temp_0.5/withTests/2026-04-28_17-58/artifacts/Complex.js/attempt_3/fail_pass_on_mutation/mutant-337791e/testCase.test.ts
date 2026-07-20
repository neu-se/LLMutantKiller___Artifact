import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex exp", () => {
  it("exp of purely imaginary number i*pi should equal -1", () => {
    // e^(i*pi) = cos(pi) + i*sin(pi) = -1 + 0i
    const result = new Complex(0, Math.PI).exp();
    expect(result.re).toBeCloseTo(-1, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});