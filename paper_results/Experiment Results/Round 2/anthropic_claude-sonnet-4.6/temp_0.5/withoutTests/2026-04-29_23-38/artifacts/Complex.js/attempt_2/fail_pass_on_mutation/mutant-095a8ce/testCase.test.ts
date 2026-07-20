import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc special case for zero input", () => {
  it("should return Complex(PI/2, Infinity) when acsc is called on zero (0 + 0i)", () => {
    const result = new Complex(0, 0).acsc();
    // Original code has special case: if (a === 0 && b === 0) return new Complex(Math.PI / 2, Infinity)
    // Mutated code replaces condition with false, causing different behavior
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBe(Infinity);
  });
});