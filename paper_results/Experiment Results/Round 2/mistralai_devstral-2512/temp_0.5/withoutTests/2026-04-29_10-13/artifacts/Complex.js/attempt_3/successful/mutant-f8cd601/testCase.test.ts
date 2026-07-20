import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csch", () => {
  it("should return a Complex instance when called", () => {
    const c = new Complex(1, 1);
    const result = c.csch();
    expect(result).toBeInstanceOf(Complex);
  });
});