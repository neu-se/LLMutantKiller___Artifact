import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh mutation test", () => {
  it("should correctly compute acosh for a complex number with specific real and imaginary parts", () => {
    const c = new Complex(1.5, 0.5);
    const result = c.acosh();
    // The mutation changes res['im'] to res[""] which will cause incorrect behavior
    // We verify the result matches the expected computation
    expect(result.re).toBeCloseTo(1.192282794218349, 6);
    expect(result.im).toBeCloseTo(0.9045568943023813, 6);
  });
});