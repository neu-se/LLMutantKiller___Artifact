import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute atanh for a complex number with real part greater than 1", () => {
    const c = new Complex(2, 1);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(0.2554128115177735, 10);
    expect(result.im).toBeCloseTo(1.5707963267948966, 10);
  });
});