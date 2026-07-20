import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech", () => {
  it("should correctly compute sech when imaginary part is non-zero", () => {
    const c = new Complex(0, 1);
    const result = c.sech();
    // The mutation changes this['im'] to this[""] which will be undefined
    // This will cause the calculation to fail in a specific way
    expect(result.re).toBeCloseTo(0.6480542736638854, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});