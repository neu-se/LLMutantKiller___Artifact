import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech() method", () => {
  it("should correctly handle the imaginary part in sech calculation", () => {
    const c = new Complex(1, 1);
    const result = c.sech();
    // The mutation changes this['im'] to this[""] which should cause incorrect calculation
    // We verify the imaginary part is calculated correctly in the original code
    expect(result.im).toBeCloseTo(-0.41314934426694, 5);
  });
});