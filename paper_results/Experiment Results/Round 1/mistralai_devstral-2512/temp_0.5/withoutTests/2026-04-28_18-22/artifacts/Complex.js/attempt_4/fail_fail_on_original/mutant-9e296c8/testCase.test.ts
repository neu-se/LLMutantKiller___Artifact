import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csch", () => {
  it("should correctly compute the hyperbolic cosecant for a complex number with real part 0.5", () => {
    const c = new Complex(0.5, 1);
    const result = c.csch();
    expect(result.re).toBeCloseTo(-0.2125729054253754, 10);
    expect(result.im).toBeCloseTo(0.4151122005940224, 10);
  });
});