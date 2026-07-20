import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex add with infinity", () => {
  it("should return Infinity when adding a finite complex number to an infinite complex number", () => {
    // In the original code, adding a finite number to Infinity returns INFINITY
    // In the mutated code, the check `if (this['isInfinite']() || z['isInfinite']())` is replaced with `if (false)`,
    // so the addition falls through to the normal path, producing incorrect results
    const finite = new Complex(3, 4);
    const result = finite.add(Complex['INFINITY']);
    
    // The result should be infinite (not NaN or a finite number)
    expect(result.isInfinite()).toBe(true);
  });
});