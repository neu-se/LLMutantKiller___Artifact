import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech() method", () => {
  it("should correctly compute sech for a complex number with specific values", () => {
    const c = new Complex(0.1, 0.2);
    const result = c.sech();
    // These values are calculated from the correct implementation
    expect(result.re).toBeCloseTo(0.9510565162951536, 10);
    expect(result.im).toBeCloseTo(-0.09966865249116204, 10);
  });
});