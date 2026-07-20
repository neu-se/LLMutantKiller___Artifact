import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute atanh for a complex number with specific real and imaginary parts", () => {
    const c = new Complex(0.8, 0.3);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(0.8107982831297268, 10);
    expect(result.im).toBeCloseTo(0.573971200330978, 10);
  });
});