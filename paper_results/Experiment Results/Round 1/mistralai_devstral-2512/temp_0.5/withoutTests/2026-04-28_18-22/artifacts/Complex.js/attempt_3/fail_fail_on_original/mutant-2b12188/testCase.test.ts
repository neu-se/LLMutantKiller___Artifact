import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh mutation test", () => {
  it("should correctly compute acosh for a complex number with positive real and imaginary parts", () => {
    const c = new Complex(2, 1);
    const result = c.acosh();
    // The mutation changes res['im'] to res[""] which will cause incorrect behavior
    // We verify the result matches the expected computation
    expect(result.re).toBeCloseTo(1.528570652250052, 10);
    expect(result.im).toBeCloseTo(1.2213572639376833, 10);
  });
});