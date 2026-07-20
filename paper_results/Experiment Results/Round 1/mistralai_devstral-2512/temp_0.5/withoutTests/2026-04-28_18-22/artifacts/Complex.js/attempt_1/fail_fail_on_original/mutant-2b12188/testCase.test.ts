import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh mutation test", () => {
  it("should correctly compute acosh for a complex number with non-zero imaginary part", () => {
    const c = new Complex(2, 3);
    const result = c.acosh();
    // The mutation changes res['im'] to res[""], which should cause a different result
    // when the imaginary part is non-zero. We check the real part of the result.
    expect(result.re).toBeCloseTo(1.983387029950206, 10);
    expect(result.im).toBeCloseTo(-0.9624236501192069, 10);
  });
});