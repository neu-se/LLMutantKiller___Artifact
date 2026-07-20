import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech()", () => {
  it("should correctly compute asech for complex numbers with specific values", () => {
    const z = new Complex(0.5, 0.5);
    const result = z.asech();
    // The mutation changes this['im'] to this[""] which will be undefined
    // This should cause the calculation to produce different results
    // We check the exact values that should differ between original and mutated versions
    expect(result.re).toBeCloseTo(1.0612750619050357);
    expect(result.im).toBeCloseTo(-0.9045568943023813);
  });
});