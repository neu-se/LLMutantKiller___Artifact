import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh mutation test", () => {
  it("should correctly handle acosh computation when imaginary part is non-zero", () => {
    const c = new Complex(0.5, 1);
    const result = c.acosh();
    // The mutation changes res['im'] to res[""] which will cause incorrect behavior
    // We verify the imaginary part is correctly computed
    expect(result.im).toBeCloseTo(1.0001435424737974, 10);
  });
});