import { Complex } from "./complex.js";

describe("Complex.csc", () => {
  it("should correctly compute the cosecant of a complex number", () => {
    const c = new Complex(1, 1);
    const result = c.csc();
    expect(result.re).toBeCloseTo(0.662936863979417, 10);
    expect(result.im).toBeCloseTo(-0.367341992051338, 10);
  });
});