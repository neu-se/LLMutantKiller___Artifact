import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly handle imaginary part when real part is greater than 1 and imaginary part is non-zero", () => {
    const result = new Complex(2, 1).atanh();
    expect(result.im).toBeCloseTo(1.3389725222944935, 9);
  });
});