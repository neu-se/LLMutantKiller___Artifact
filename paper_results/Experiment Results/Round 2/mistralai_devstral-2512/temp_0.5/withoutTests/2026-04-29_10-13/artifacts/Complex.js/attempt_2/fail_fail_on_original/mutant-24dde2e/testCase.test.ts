import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec()", () => {
  it("should compute asec correctly for complex number (2, 3)", () => {
    const c = new Complex(2, 3);
    const result = c.asec();
    // The mutation changes d = a*a + b*b to d = a*a - b*b
    // For (2,3), original d = 4+9=13, mutated d = 4-9=-5
    // This will produce different results in the acos calculation
    expect(result.re).toBeCloseTo(1.063443705, 6);
    expect(result.im).toBeCloseTo(-0.452278599, 6);
  });
});