import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh method", () => {
  it("should correctly compute acosh for a complex number with positive imaginary part", () => {
    const c = new Complex(1, 2);
    const result = c.acosh();
    expect(result.re).toBeCloseTo(1.528570470235201);
    expect(result.im).toBeCloseTo(-1.0927888112123123);
  });
});