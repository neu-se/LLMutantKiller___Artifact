import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("acsc(1) returns PI/2 with negative zero imaginary part", () => {
    const result = new Complex(1, 0).acsc();
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(Object.is(result.im, -0)).toBe(true);
  });
});