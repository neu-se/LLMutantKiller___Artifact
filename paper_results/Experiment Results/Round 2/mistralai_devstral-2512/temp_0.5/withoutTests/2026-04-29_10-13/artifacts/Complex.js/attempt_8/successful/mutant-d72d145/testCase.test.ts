import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("should correctly compute acsc for a complex number with real=0.5 and imaginary=0.5", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0.6662394324925153, 10);
    expect(result.im).toBeCloseTo(-1.0612750619050357, 10);
  });
});