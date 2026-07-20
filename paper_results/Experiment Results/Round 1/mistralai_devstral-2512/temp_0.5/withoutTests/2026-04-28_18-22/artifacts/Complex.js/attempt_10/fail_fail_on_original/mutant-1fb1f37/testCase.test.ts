import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should detect the mutation in cosh implementation by testing numerical precision", () => {
    // Create a complex number that will trigger the cosh function
    // We'll use a value where the Taylor approximation would give a different result
    // than the full formula, but still within the small value range
    const z = new Complex(0, 1e-8); // Purely imaginary number
    const result = z.cos(); // cos(iy) = cosh(y), which uses the internal cosh function

    // The original code should use 1 - x for small x (|x| < 1e-9)
    // The mutated code always uses the full formula
    // For x = 1e-8, the original would use the full formula (since 1e-8 > 1e-9)
    // But we can test with a value that should trigger the Taylor approximation
    const z2 = new Complex(0, 1e-10);
    const result2 = z2.cos();

    // For x = 1e-10, original uses 1 - x, mutated uses full formula
    // The difference should be detectable
    const expectedTaylor = 1 - 1e-10;
    const expectedFull = (Math.exp(1e-10) + Math.exp(-1e-10)) * 0.5;

    // The original should be closer to the Taylor approximation
    // The mutated should be closer to the full formula
    expect(Math.abs(result2.re - expectedTaylor)).toBeLessThan(Math.abs(result2.re - expectedFull));
  });
});