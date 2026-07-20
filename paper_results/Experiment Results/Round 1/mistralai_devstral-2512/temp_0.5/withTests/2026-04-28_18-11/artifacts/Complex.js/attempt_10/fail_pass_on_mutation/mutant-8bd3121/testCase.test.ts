import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech() method", () => {
  it("should fail when imaginary part is accessed incorrectly", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.asech();
    // The mutation changes this['im'] to this[""] which will be undefined
    // This will cause the calculation to produce NaN results
    expect(result.isNaN()).toBe(false);
  });
});