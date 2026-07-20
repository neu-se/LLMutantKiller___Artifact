import { Complex } from "./complex.js";

describe("Complex.acsch", () => {
  it("should correctly compute the inverse hyperbolic cosecant for a complex number with non-zero imaginary part", () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    // The mutation changes d = a*a + b*b to d = a*a - b*b in acsch
    // For (1,1), original d = 1+1=2, mutated d = 1-1=0
    // This will cause different behavior in the calculation
    expect(result.re).toBeCloseTo(0.4135, 3);
    expect(result.im).toBeCloseTo(-0.9553, 3);
  });
});