import { Complex } from "./complex.js";

describe("Complex.acoth()", () => {
  it("should correctly handle the case when a and b are both zero", () => {
    const result = new Complex(0, 0).acoth();
    expect(result.re).toBe(0);
    expect(result.im).toBe(Math.PI / 2);
  });
});