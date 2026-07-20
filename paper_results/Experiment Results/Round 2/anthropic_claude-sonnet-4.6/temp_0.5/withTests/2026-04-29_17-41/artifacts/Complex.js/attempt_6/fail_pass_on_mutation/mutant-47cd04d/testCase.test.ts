import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex add", () => {
  it("adding two infinite complex numbers returns NaN", () => {
    const inf1 = new Complex(Infinity, Infinity);
    const inf2 = new Complex(Infinity, Infinity);
    const result = inf1.add(inf2);
    expect(result.isNaN()).toBe(true);
    expect(result.re).toBeNaN();
    expect(result.im).toBeNaN();
  });
});