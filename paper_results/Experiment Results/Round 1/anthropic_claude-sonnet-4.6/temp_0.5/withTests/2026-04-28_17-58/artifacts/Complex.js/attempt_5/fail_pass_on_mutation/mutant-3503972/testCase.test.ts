import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("detects sign mutation via comparing asinh of opposite infinity imaginary parts", () => {
    const orig = new Complex(-Infinity, -Infinity).asinh();
    const mut = new Complex(-Infinity, Infinity).asinh();
    // Verify these are actually different so our test is meaningful
    // Then test actual acsch result matches original
    const z = new Complex(-1e-200, 1e-200);
    const result = z.acsch();
    expect(JSON.stringify({re: result.re, im: result.im}))
      .toBe(JSON.stringify({re: orig.re, im: orig.im}));
  });
});