import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh()", () => {
  it("should return correct imaginary part when real part is -1 and imaginary part is non-zero", () => {
    const result = new Complex(-1, 0.1).atanh();
    expect(result.im).toBeCloseTo(0.1001674211615598, 10);
  });
});