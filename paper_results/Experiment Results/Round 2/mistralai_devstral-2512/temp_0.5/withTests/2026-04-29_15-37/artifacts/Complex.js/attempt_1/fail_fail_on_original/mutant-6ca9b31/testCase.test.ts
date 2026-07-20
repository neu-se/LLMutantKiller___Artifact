import { Complex } from "./complex.js";

describe("Complex number string representation", () => {
  it("should correctly format complex number with negative imaginary part", () => {
    const c = new Complex(1, -1);
    expect(c.toString()).toBe("1 - i");
  });
});