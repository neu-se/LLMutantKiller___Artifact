import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh mutation test", () => {
  it("should correctly compute acosh and verify the exact property access behavior", () => {
    const c = new Complex(1, 1);
    const result = c.acosh();
    // The mutation changes res['im'] to res[""] which will cause incorrect behavior
    // We verify the result has the expected imaginary part
    expect(result.im).toBeCloseTo(0.9045568943023813, 6);
    // Also verify the real part is correct
    expect(result.re).toBeCloseTo(1.0693110431581108, 6);
  });
});