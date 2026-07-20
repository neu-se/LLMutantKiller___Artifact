import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly handle imaginary part when real part is greater than 1", () => {
    const c = new Complex(2, 1);
    const result = c.atanh();
    expect(result.im).toBeCloseTo(-0.25, 10);
  });
});