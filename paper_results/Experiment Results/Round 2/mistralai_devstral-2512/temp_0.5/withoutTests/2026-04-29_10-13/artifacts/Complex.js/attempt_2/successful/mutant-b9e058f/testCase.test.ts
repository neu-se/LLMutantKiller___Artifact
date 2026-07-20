import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex add method", () => {
  it("should return Infinity when adding one infinite and one finite complex number", () => {
    const infiniteComplex = new Complex(Infinity, Infinity);
    const finiteComplex = new Complex(1, 1);
    const result = infiniteComplex.add(finiteComplex);
    expect(result.isInfinite()).toBe(true);
  });
});