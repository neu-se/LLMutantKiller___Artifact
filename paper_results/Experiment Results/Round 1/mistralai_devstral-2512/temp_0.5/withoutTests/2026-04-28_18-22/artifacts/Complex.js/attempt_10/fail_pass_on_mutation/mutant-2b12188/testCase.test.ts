import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh mutation test", () => {
  it("should correctly compute acosh and verify the property access pattern", () => {
    const c = new Complex(2, 3);
    const result = c.acosh();
    // The mutation changes res['im'] to res[""] which will cause incorrect behavior
    // We verify the result has the expected imaginary part
    expect(result.im).toBeCloseTo(1.0001435424737974, 6);
  });
});