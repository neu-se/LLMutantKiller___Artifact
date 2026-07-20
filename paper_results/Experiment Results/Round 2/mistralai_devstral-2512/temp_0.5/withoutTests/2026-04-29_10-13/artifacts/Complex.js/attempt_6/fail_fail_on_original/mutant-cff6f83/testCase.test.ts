import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should correctly compute the inverse hyperbolic cosecant for a specific complex number", () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    // Verify the calculation uses division (/) rather than multiplication (*)
    // by checking the expected mathematical relationship
    expect(result.re).toBeCloseTo(0.5306, 4);
    expect(result.im).toBeCloseTo(-0.5306, 4);
  });
});