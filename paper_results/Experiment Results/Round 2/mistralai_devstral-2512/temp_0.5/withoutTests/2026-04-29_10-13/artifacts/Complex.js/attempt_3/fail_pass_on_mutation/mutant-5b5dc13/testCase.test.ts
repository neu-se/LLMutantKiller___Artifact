import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should return Infinity for real part when a is 0 and b is 0", () => {
    const result = new Complex(0, 0).acsch();
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(0);
  });
});