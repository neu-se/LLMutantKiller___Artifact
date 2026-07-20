import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs hypot branch", () => {
  it("abs of Complex(2, 4000) differs between original and mutated", () => {
    const c = new Complex(2, 4000);
    const result = c.abs();
    // Original: b = y/x = 2000, result ≈ 8000000
    // Mutated: b = y*x = 8000, result ≈ 32000000
    // True value: sqrt(4 + 16000000) ≈ 4000.0005
    expect(result).toBeCloseTo(4000, 0);
  });
});