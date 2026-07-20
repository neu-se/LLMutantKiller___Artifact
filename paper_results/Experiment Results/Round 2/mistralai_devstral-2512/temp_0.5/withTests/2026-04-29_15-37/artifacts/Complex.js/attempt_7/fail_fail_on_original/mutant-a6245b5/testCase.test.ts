import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh()", () => {
  it("should return correct result when real part is -1 and imaginary part is non-zero", () => {
    const result = new Complex(-1, 0.1).atanh();
    expect(result.re).toBeCloseTo(-0.708303336014054, 10);
    expect(result.im).toBeCloseTo(0.1001674211615598, 10);
  });
});