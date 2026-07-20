import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing valueOf", () => {
  it("should return the real value when imaginary part is zero after string parsing", () => {
    const c = new Complex("5");
    expect(c.valueOf()).toBe(5);
    expect(+c).toBe(5);
  });
});