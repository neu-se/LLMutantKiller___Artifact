import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex add with infinity", () => {
  it("should return INFINITY when adding complex with Infinity imaginary part to finite number", () => {
    // When z is infinite (re=Infinity, im=Infinity) and this is finite (re=1, im=2)
    // Original: returns Complex.INFINITY with re=Infinity, im=Infinity
    // Mutated: returns new Complex(1+Infinity, 2+Infinity) = new Complex(Infinity, Infinity)
    // These seem the same... need a case where NaN is produced
    // Try: this = new Complex(-Infinity, 2) which is NOT infinite (only one component infinite)
    // Actually isInfinite = !(isNaN || isFinite), so if re=-Infinity, im=2, isFinite=false, isNaN=false => isInfinite=true
    // Then z = new Complex(Infinity, 0)
    // Original: returns Complex.INFINITY
    // Mutated: new Complex(-Infinity + Infinity, 2 + 0) = new Complex(NaN, 2) => isNaN!
    const thisComplex = new Complex(-Infinity, 2);
    const z = new Complex(Infinity, 0);
    const result = thisComplex.add(z);
    expect(result.isNaN()).toBe(false);
    expect(result.isInfinite()).toBe(true);
  });
});