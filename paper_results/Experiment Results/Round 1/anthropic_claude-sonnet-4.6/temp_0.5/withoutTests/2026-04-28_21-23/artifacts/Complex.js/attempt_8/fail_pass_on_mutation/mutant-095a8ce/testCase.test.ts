import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("acsc of zero should return a complex number with Infinity imaginary part, not a finite number", () => {
    const zero = new Complex(0, 0);
    const result = zero['acsc']();
    
    // Original code: returns new Complex(Math.PI / 2, Infinity)
    // Mutated code: if(false) never triggers, falls to d=0 branch,
    // returns new Complex(0, 0).asin() = new Complex(0, 0)
    // So original has isInfinite() = true, mutated has isInfinite() = false
    expect(result['isInfinite']()).toBe(true);
  });
});