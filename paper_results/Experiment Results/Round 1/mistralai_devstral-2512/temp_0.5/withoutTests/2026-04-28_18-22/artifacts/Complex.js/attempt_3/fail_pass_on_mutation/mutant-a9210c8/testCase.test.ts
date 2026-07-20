import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech", () => {
  it("should handle the sech method correctly when accessing imaginary part", () => {
    const c = new Complex(0, 1);
    const result = c.sech();
    expect(result).toBeDefined();
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
  });
});