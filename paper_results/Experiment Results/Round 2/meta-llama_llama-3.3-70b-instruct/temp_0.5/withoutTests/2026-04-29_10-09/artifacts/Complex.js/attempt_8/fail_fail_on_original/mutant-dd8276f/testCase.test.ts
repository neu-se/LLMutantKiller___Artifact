import { Complex } from "../../../complex.js";

describe("Complex", () => {
  it("should correctly calculate the complex arcus cosecans for a specific case", () => {
    const c = new Complex(1, 1);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(-0.46364760900080615, 10);
    expect(result.im).toBeCloseTo(-0.6217765872964264, 10);
  });
});