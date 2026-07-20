import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech", () => {
  it("should correctly compute sech for complex numbers with non-zero imaginary part", () => {
    const c = new Complex(0, 1);
    const result = c.sech();
    expect(result.re).toBeCloseTo(0.6480542736638855);
    expect(result.im).toBeCloseTo(0);
  });
});