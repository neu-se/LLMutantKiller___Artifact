import { Complex } from "./complex.js";

describe("Complex.acsch", () => {
  it("should return Infinity for real zero input", () => {
    const result = new Complex(0, 0).acsch();
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(0);
  });
});