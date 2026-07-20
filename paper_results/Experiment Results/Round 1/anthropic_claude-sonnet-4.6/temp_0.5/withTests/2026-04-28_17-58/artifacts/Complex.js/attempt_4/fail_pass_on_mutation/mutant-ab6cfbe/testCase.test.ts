import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log", () => {
  it("log of purely imaginary number i should return correct value", () => {
    // log(i) = log(0 + 1i) = logHypot(0,1) + i*atan2(1,0) = 0 + i*pi/2
    const result = new Complex(0, 1).log();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});