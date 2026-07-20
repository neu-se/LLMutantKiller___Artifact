import { Complex } from "./complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute atanh for a complex number with non-zero real and imaginary parts", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(0.2298488470659307, 10);
    expect(result.im).toBeCloseTo(0.4023594781085251, 10);
  });
});