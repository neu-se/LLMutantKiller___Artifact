import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh and verify the result has valid re and im properties", () => {
    const c = new Complex(1, 1);
    const result = c.acosh();
    // Verify the result has the expected properties
    expect('re' in result).toBe(true);
    expect('im' in result).toBe(true);
    // Verify the properties are numbers
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
    // Verify the actual computation
    expect(result.re).toBeCloseTo(1.0612750619050357);
    expect(result.im).toBeCloseTo(0.9045568943023812);
  });
});