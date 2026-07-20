import { Complex } from "./complex.js";

describe("Complex.atanh()", () => {
  it("should correctly handle imaginary part when real part is -1", () => {
    const result = new Complex(-1, 0.5).atanh();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});