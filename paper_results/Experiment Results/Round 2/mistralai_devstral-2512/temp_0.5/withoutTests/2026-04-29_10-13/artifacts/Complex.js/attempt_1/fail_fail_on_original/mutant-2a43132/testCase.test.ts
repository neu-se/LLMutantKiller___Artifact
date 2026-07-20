import { Complex } from "./complex.js";

describe("Complex.asec", () => {
  it("should correctly compute the arcsecant of a complex number", () => {
    const c = new Complex(2, 3);
    const result = c.asec();
    expect(result.re).toBeCloseTo(0.2837941092083274, 10);
    expect(result.im).toBeCloseTo(-1.420701924855478, 10);
  });
});