import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("should correctly compute acsc for a complex number with non-zero real and imaginary parts", () => {
    const c = new Complex(1, 1);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0.452278, 5);
    expect(result.im).toBeCloseTo(-0.308148, 5);
  });
});