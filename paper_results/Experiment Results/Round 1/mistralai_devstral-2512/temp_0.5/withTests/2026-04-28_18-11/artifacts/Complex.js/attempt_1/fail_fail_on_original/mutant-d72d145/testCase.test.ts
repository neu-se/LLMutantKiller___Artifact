import { Complex } from "./complex.js";

describe("Complex.acsc()", () => {
  it("should correctly compute acsc for a non-zero complex number", () => {
    const c = new Complex(1, 1);
    const result = c.acsc();
    // Expected result calculated using the correct formula: acsc(c) = -i * log(i / c + sqrt(1 - 1 / c^2))
    // For c = 1 + i, this should yield a specific value that differs when the mutation is present
    expect(result.re).toBeCloseTo(0.402359478108525, 10);
    expect(result.im).toBeCloseTo(-0.402359478108525, 10);
  });
});