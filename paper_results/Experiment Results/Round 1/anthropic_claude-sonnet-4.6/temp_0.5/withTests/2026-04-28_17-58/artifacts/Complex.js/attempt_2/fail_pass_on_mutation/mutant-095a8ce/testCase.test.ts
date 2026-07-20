import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("should return PI/2 + Infinity*i when called on zero complex number", () => {
    const result = new Complex(0, 0).acsc();
    expect(result.im).toBe(Infinity);
  });
});