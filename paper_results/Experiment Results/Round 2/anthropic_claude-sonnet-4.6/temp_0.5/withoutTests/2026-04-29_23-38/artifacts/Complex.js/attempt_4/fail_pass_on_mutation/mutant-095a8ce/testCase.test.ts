import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("acsc of zero should have real part equal to PI/2", () => {
    const z = new Complex(0, 0);
    const result = (z as any).acsc();
    // Original: returns Complex(PI/2, Infinity)
    // Mutated: if(false) skips special case, falls through to d=0 path returning asin(0,0) = Complex(0,0)
    expect(result.re).not.toBe(0);
    expect(result.re).toBeCloseTo(Math.PI / 2);
  });
});