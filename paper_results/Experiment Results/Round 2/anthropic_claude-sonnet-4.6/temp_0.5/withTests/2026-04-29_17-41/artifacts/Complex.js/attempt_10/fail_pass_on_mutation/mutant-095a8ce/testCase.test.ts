import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc mutation detection", () => {
  it("acsc(0) real part must be Math.PI/2 not 0", () => {
    const result = new Complex(0).acsc();
    expect(result.re === 0).toBe(false);
  });
});