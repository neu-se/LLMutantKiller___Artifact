import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sinh small value", () => {
  it("should handle values smaller than 1e-9 correctly using the identity approximation", () => {
    // For |x| < 1e-9, both original and mutated return x (same branch)
    // But if the mutation removes Math.sinh ||, then for larger values it matters
    // Test that sinh method on complex gives correct result for z = 1e-10 (tiny)
    const c = new Complex(0, 1e-10);
    const result = c.sin(); // sin uses sinh internally
    // sin(i*1e-10) ≈ i*1e-10 for tiny values
    expect(result.im).toBeCloseTo(1e-10, 20);
  });
});