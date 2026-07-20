import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("acot(0+0i) returns PI/2 via the b===0 early return path", () => {
    // When b=0, acot returns atan2(1, a)
    // acot(0) = atan2(1, 0) = PI/2
    const result = new Complex(0, 0).acot();
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBeCloseTo(0, 10);
    expect(result.isNaN()).toBe(false);
  });
});