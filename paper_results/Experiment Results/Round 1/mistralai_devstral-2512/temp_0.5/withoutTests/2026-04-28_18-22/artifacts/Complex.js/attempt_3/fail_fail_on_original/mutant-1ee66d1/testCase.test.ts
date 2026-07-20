import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should correctly handle division by zero in acsc for complex numbers with zero real part", () => {
    const c = new Complex(0, 1);
    const result = c.acsc();
    expect(result.im).toBe(-Infinity);
  });
});