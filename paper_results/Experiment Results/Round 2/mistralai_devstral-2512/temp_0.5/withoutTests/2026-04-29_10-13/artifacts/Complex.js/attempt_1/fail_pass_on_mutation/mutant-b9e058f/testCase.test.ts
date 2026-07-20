import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex add method", () => {
  it("should return NaN when adding two infinite complex numbers", () => {
    const infiniteComplex1 = new Complex(Infinity, Infinity);
    const infiniteComplex2 = new Complex(Infinity, Infinity);
    const result = infiniteComplex1.add(infiniteComplex2);
    expect(result.isNaN()).toBe(true);
  });
});