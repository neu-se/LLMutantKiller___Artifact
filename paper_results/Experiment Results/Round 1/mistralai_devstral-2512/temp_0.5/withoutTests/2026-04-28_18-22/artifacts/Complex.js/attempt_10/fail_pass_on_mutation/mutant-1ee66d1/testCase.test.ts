import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should correctly handle division by zero in acsc for complex numbers with zero real part", () => {
    const c = new Complex(0, 1);
    const result = c.acsc();
    // The mutation changes -b/0 to -b*0, which changes -Infinity to 0
    // This should make the imaginary part different between original and mutated
    expect(result.im).toBeLessThan(-0.8);
  });
});