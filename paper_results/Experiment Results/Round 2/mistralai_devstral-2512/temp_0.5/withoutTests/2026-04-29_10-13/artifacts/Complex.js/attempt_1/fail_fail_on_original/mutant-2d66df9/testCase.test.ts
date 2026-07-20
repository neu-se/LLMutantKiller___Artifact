import { Complex } from "./complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex number with negative imaginary part", () => {
    const c = new Complex("3-2i");
    expect(c.re).toBeCloseTo(3, 10);
    expect(c.im).toBeCloseTo(-2, 10);
  });
});