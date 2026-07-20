import { Complex } from "./complex.js";

describe("Complex.atanh", () => {
  it("should correctly handle imaginary part when real part is greater than 1", () => {
    const result = new Complex(2, 1).atanh();
    expect(result.im).toBeCloseTo(-0.2554128115, 9);
  });
});