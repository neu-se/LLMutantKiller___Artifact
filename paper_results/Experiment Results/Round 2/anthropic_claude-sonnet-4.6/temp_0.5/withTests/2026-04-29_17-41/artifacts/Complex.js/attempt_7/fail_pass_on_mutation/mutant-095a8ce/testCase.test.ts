import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("acsc(0) should return PI/2 + Infinity*i", () => {
    const result = new Complex(0, 0).acsc();
    // Original returns Complex(PI/2, Infinity), mutated returns Complex(0, 0)
    expect(result.toString()).toBe('Infinity');
  });
});