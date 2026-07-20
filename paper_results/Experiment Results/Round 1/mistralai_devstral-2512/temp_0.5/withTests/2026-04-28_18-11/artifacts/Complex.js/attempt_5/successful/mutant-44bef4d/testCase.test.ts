import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should correctly compute the arc cosecant for a complex number where the mutation would cause a significant difference", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.acsc();
    // The mutation changes -b/d to -b*d in the acsc method
    // Using a value where d = a^2 + b^2 = 0.5^2 + 0.5^2 = 0.5
    // Original: -b/d = -0.5/0.5 = -1
    // Mutated: -b*d = -0.5*0.5 = -0.25
    // This difference should propagate through the calculation
    expect(result.re).toBeCloseTo(0.6662394324925153, 10);
    expect(result.im).toBeCloseTo(-1.0612750619050357, 10);
  });
});