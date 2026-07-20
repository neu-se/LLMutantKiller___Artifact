import { Complex } from "./complex.js";

describe("Complex", () => {
  it("should calculate acosh correctly", () => {
    const complex = new Complex(2, 0);
    const result = complex.acosh();
    const tmp = result.re;
    expect(tmp).toBeCloseTo(1.3169578969248166);
    expect(result.im).toBeCloseTo(0);
  });
});