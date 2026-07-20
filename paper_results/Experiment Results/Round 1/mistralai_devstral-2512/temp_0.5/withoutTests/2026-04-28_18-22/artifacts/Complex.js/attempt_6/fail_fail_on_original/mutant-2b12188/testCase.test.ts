import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh mutation test", () => {
  it("should correctly handle acosh computation for complex numbers where imaginary part affects the result", () => {
    const c = new Complex(0, 2);
    const result = c.acosh();
    // The mutation changes res['im'] to res[""] which will cause incorrect behavior
    // We verify the result matches the expected computation
    expect(result.re).toBeCloseTo(1.3169578969248166, 6);
    expect(result.im).toBeCloseTo(1.5707963267948966, 6);
  });
});