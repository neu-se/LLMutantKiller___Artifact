import { Complex } from "./complex";

describe("Complex.csch", () => {
  it("should compute the hyperbolic cosecant of a complex number", () => {
    const z = new Complex(1, 1);
    const result = z.csch();
    expect(result.re).toBeCloseTo(-0.3181315052047641, 10);
    expect(result.im).toBeCloseTo(0.634856232743762, 10);
  });
});