import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("acot of tiny complex number should have NaN real part (not -0) when d underflows", () => {
    const tiny = 1e-200;
    expect(tiny * tiny).toBe(0); // confirm underflow
    const result = new Complex(tiny, tiny).acot();
    // Original: atan(Infinity, -Infinity) -> t1_im = NaN -> re = NaN
    // Mutated:  atan(0, -Infinity)        -> t1_im = 0  -> re = -0
    expect(isNaN(result.re)).toBe(true);
  });
});