import { Complex } from "./complex.js";

describe("Complex.acoth()", () => {
  it("should return the correct value for acoth(0)", () => {
    const result = new Complex(0, 0).acoth();
    expect(result.re).toBe(0);
    expect(result.im).toBe(Math.PI / 2);
  });
});