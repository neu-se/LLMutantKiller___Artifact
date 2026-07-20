import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech()", () => {
  it("should handle complex numbers with non-zero imaginary part", () => {
    const z = new Complex(0.5, 0.5);
    const result = z.asech();
    expect(result.re).toBeCloseTo(0.881373587019543, 10);
    expect(result.im).toBeCloseTo(-0.402354430222928, 10);
  });
});