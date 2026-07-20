import { Complex } from "./complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute atanh for a specific complex number", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(0.402359478108525, 10);
    expect(result.im).toBeCloseTo(0.554939031212916, 10);
  });
});