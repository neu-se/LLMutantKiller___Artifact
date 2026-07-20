import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech() method", () => {
  it("should correctly compute asech for a real number", () => {
    const c = new Complex(0.5, 0);
    const result = c.asech();
    expect(result.re).toBeCloseTo(1.3169578969248166);
    expect(result.im).toBeCloseTo(0);
  });
});