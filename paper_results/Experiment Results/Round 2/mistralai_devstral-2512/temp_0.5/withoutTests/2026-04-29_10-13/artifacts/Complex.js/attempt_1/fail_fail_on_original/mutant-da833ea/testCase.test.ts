import { Complex } from "./complex.js";

describe("Complex.asech", () => {
  it("should correctly compute asech for a complex number", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.asech();
    expect(result.re).toBeCloseTo(0.5, 6);
    expect(result.im).toBeCloseTo(-0.5, 6);
  });
});