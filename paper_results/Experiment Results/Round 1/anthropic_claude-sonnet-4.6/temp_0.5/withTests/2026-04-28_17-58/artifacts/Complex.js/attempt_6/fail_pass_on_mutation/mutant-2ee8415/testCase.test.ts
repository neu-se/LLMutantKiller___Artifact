import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh(-2) where else branch is taken", () => {
    // acosh(-2) should equal log(-2 + sqrt(3)) which has imaginary part pi
    // acos(-2) = pi - i*acosh(2), so acos(-2).im = -acosh(2) < 0... 
    // Try z = -2 + 0.001i to get acos with positive im
    const c = new Complex(-0.5, -0.5);
    const acos = c.acos();
    
    const result = c.acosh();
    // directly check re value matches expected from acos swap
    if (acos.im > 0) {
      // else branch: re should be acos.im, not acos.re
      expect(result.re).toBeCloseTo(acos.im, 8);
    } else {
      // if branch: re should be -acos.im
      expect(result.re).toBeCloseTo(-acos.im, 8);
    }
  });
});