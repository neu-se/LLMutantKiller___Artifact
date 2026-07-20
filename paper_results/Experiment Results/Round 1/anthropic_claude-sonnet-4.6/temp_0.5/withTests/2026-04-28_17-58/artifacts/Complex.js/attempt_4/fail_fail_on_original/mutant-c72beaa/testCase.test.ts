import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot mutation detection", () => {
  it("atan(Infinity, -Infinity) should differ from atan(0, -Infinity)", () => {
    const withInfinity = new Complex(Infinity, -Infinity).atan();
    const withZero = new Complex(0, -Infinity).atan();
    // Check if these actually differ - if so, the mutation in acot is detectable
    // via the underflow path
    expect(withInfinity.re).not.toBe(withZero.re);
  });
});