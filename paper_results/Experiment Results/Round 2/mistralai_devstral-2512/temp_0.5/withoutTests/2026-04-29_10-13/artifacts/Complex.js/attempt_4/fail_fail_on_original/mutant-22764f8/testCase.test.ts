import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth method", () => {
  it("should correctly compute acoth for a complex number with non-zero imaginary part", () => {
    const c = new Complex(2, 1);
    const result = c.acoth();
    expect(result.re).toBeCloseTo(0.3333, 4);
    expect(result.im).toBeCloseTo(-0.3333, 4);
  });
});