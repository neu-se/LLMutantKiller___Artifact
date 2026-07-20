import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acot", () => {
  it("should return Infinity for real part when input is (0, 0)", () => {
    const result = new Complex(0, 0).acot();
    expect(result.re).toBe(Infinity);
    expect(result.im).toBeCloseTo(Math.PI / 2);
  });
});