import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh mutation test", () => {
  it("should correctly handle acosh computation when imaginary part is positive", () => {
    const c = new Complex(1, 1);
    const result = c.acosh();
    // The mutation changes res['im'] to res[""] which will cause incorrect behavior
    // We verify the imaginary part is correctly computed
    expect(result.im).toBeCloseTo(1.076674047468581, 10);
  });
});