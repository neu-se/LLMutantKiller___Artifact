import { Complex } from "./complex.js";

describe("Complex.acot()", () => {
  it("should return correct result for acot(0)", () => {
    const result = new Complex(0, 0).acot();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(Math.PI / 2);
  });
});