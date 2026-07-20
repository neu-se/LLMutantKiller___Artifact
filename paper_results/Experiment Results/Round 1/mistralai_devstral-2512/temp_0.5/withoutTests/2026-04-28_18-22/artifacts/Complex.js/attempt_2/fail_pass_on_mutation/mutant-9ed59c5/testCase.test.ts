import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js AMD/CommonJS export", () => {
  it("should correctly export Complex in CommonJS environment", () => {
    // Test that the module exports are properly configured
    // The mutation breaks the export logic by having an empty if block
    expect(Complex).toBeDefined();
    expect(typeof Complex).toBe("function");

    // Verify basic functionality works
    const c = new Complex(3, 4);
    expect(c.re).toBe(3);
    expect(c.im).toBe(4);
    expect(c.abs()).toBeCloseTo(5);
  });
});