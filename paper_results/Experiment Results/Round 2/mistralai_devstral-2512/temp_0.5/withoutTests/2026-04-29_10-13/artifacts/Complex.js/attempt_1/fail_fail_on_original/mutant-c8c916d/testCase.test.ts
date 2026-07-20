import { Complex } from "./complex.js";

describe("Complex.acsc()", () => {
  it("should correctly handle the case when a and b are both zero", () => {
    const result = new Complex(0, 0).acsc();
    expect(result.re).toBe(Math.PI / 2);
    expect(result.im).toBe(Infinity);
  });
});