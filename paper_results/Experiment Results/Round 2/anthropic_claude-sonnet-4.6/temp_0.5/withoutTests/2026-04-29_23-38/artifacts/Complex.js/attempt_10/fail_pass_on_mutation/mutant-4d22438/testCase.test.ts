import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex hypot mutation", () => {
  it("abs of large complex product should be consistent with multiplication", () => {
    const z = new Complex(3000, 4000);
    // |z|^2 computed two ways
    const absSquared = z.abs() * z.abs();
    const directSquared = z.re * z.re + z.im * z.im; // 9e6 + 16e6 = 25e6
    expect(absSquared).toBeCloseTo(directSquared, -3);
  });
});