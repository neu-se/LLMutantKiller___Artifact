import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech()", () => {
  it("should return a Complex object when called", () => {
    const z = new Complex(1, 1);
    const result = z.sech();
    expect(result).toBeInstanceOf(Complex);
  });
});