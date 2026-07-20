import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("should return a string representation of PI/2 + Infinity*i for acsc(0)", () => {
    const result = new Complex(0, 0).acsc();
    expect(result.toString()).toBe('Infinity');
  });
});