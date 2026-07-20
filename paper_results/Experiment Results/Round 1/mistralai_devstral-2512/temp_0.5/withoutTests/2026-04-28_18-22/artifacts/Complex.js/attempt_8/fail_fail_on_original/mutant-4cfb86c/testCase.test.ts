import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acot", () => {
  it("should return -Infinity for real part when input is (0,1)", () => {
    const result = new Complex(0, 1).acot();
    expect(result.re).toBe(-Infinity);
    expect(result.im).toBe(0);
  });
});