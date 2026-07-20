import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should correctly compute acsc for a complex number with specific real and imaginary parts", () => {
    const c = new Complex(1, 1);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0.45227844715119064, 10);
    expect(result.im).toBeCloseTo(-0.5306375309525179, 10);
  });
});