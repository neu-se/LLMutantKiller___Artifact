import { Complex } from "../../../complex.js";

describe("Complex", () => {
  it("should correctly calculate the complex arcus cosecans", () => {
    const c = new Complex(1, 0);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});