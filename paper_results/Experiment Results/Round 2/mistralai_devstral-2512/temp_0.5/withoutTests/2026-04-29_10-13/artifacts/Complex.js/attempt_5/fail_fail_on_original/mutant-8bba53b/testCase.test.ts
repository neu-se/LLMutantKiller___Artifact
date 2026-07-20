import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for x = π/4 boundary case", () => {
    // Test at the boundary where Taylor series switches to direct computation
    const x = Math.PI / 4;
    const c = new Complex(x, 0);
    const expm1 = c.expm1();
    const expected = Math.cos(x) - 1;
    // The real part should match the expected value
    expect(expm1.re).toBeCloseTo(expected, 10);
  });
});