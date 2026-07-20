import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csch function", () => {
  it("should correctly compute the complex hyperbolic cosecant csch(1 + i)", () => {
    const z = new Complex(1, 1);
    const result = z.csch();

    // csch(c) = 2 / (e^c - e^-c)
    // For z = 1 + i:
    // csch(1+i) should have non-trivial real and imaginary parts
    // The mutated version returns undefined (empty function body)
    // so result would be undefined or have no re/im properties

    expect(result).toBeDefined();
    expect(result).not.toBeUndefined();
    expect(typeof result.re).toBe("number");
    expect(typeof result.im).toBe("number");

    // Verify actual computed values
    // csch(a + bi) = -2*sinh(a)*cos(b)/d + i*2*cosh(a)*sin(b)/d
    // where d = cos(2b) - cosh(2a)
    const a = 1;
    const b = 1;
    const d = Math.cos(2 * b) - Math.cosh(2 * a);
    const expectedRe = -2 * Math.sinh(a) * Math.cos(b) / d;
    const expectedIm = 2 * Math.cosh(a) * Math.sin(b) / d;

    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});