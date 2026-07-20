import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method with infinite values", () => {
  it("should return NaN when subtracting an infinite number from a finite number", () => {
    // Original: first check uses ||, so finite - Infinity triggers NaN
    // Mutated: first check uses &&, so finite - Infinity falls through to second check returning Infinity
    const finite = new Complex(3, 4);
    const inf = Complex.INFINITY;
    const result = finite.sub(inf);

    // In original code: finite - Infinity = NaN (|| check)
    // In mutated code: finite - Infinity = Infinity (&& check doesn't trigger, || does on second check)
    expect(result.isNaN()).toBe(true);
  });
});