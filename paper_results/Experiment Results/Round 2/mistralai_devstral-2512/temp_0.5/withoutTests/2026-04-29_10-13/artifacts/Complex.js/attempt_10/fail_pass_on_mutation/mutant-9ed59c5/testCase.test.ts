import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js module export verification", () => {
  it("should verify module exports structure matches expected pattern", () => {
    // This test specifically checks the module exports structure
    // The mutation removes the AMD export logic which changes the exports structure

    const moduleExports = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

    // In the original code, the module should have these specific properties
    // due to the AMD and CommonJS export logic
    expect(moduleExports).toBeDefined();
    expect(typeof moduleExports).toBe('function');

    // Check for the specific export pattern that exists in original code
    expect(moduleExports).toHaveProperty('__esModule', true);
    expect(moduleExports).toHaveProperty('default');
    expect(moduleExports.default).toBe(moduleExports);
    expect(moduleExports).toHaveProperty('Complex');
    expect(moduleExports.Complex).toBe(moduleExports);

    // Verify basic functionality
    const c = new moduleExports(1, 1);
    expect(c.re).toBe(1);
    expect(c.im).toBe(1);

    // The mutation removes the AMD export logic which should cause this test to fail
    // because the exports structure would be different
  });
});