import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh mutation test", () => {
  it("should correctly compute acosh and verify specific property access pattern", () => {
    const c = new Complex(1, 1);
    const result = c.acosh();
    // The mutation changes res['im'] to res[""] which will cause incorrect behavior
    // We verify the imaginary part can be accessed correctly
    const imValue = result['im'];
    expect(typeof imValue).toBe('number');
    expect(imValue).toBeCloseTo(0.9045568943023813, 6);
  });
});