import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should correctly handle non-zero imaginary part", () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0.4161468365471424);
    expect(result.im).toBeCloseTo(-0.9272952180016122);
  });
});