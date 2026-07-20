import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js export behavior", () => {
  it("should properly export Complex in CommonJS environment", () => {
    // The mutation breaks the export logic by having an empty if block
    // This test verifies the exports are properly configured
    const moduleExports = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

    // Verify the module exports structure
    expect(moduleExports).toBeDefined();
    expect(moduleExports.Complex).toBeDefined();
    expect(typeof moduleExports.Complex).toBe("function");

    // The key test: verify we can create instances from both exports
    const c1 = new moduleExports.Complex(1, 2);
    const c2 = new Complex(1, 2);

    // Both should produce identical results
    expect(c1.re).toBe(c2.re);
    expect(c1.im).toBe(c2.im);
    expect(c1.toString()).toBe(c2.toString());

    // Test that the module exports are properly set up
    expect(moduleExports.__esModule).toBe(true);
    expect(moduleExports.default).toBeDefined();
    expect(moduleExports.Complex).toBe(moduleExports.default);
  });
});