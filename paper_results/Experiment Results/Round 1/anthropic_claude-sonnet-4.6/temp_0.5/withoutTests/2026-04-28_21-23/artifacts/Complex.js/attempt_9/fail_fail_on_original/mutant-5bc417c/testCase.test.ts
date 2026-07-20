import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("acoth(2) returns 0 real and PI/2 imaginary due to if(true) guard", () => {
    const result = new Complex(2, 0).acoth();
    expect(result.re).toBe(0);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});