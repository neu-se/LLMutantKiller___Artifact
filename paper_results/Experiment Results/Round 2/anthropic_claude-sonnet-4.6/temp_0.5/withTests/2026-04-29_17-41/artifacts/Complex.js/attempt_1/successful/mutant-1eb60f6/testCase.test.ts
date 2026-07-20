import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should return (PI/2, Infinity) when called on the zero complex number (0 + 0i)", () => {
    const zero = new Complex(0, 0);
    const result = zero.acsc();
    expect(result.re).toBe(Math.PI / 2);
    expect(result.im).toBe(Infinity);
  });
});