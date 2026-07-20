import { Complex } from "./complex.js";

describe("Complex.ceil", () => {
  it("should correctly ceil both real and imaginary parts", () => {
    const c = new Complex(1.2, 3.4);
    const result = c.ceil();
    expect(result.re).toBe(2);
    expect(result.im).toBe(4);
  });
});