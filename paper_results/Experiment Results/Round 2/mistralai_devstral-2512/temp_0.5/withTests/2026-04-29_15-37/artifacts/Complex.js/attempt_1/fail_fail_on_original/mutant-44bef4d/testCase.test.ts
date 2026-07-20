import { Complex } from "./complex.js";

describe("Complex.acsc()", () => {
  it("should correctly compute the arc cosecant of a complex number", () => {
    const c = new Complex(2, 3);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0.1455, 4);
    expect(result.im).toBeCloseTo(-0.1545, 4);
  });
});