import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js export verification", () => {
  it("should have working CommonJS exports", () => {
    // The mutation breaks the export logic by having an empty if block
    // This test verifies the exports are properly configured
    const moduleExports = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

    // Verify the module exports structure
    expect(moduleExports).toBeDefined();
    expect(moduleExports.Complex).toBeDefined();
    expect(typeof moduleExports.Complex).toBe("function");

    // The key test: verify we can create instances and use the Complex class
    const c = new moduleExports.Complex(1, 2);
    expect(c.re).toBe(1);
    expect(c.im).toBe(2);

    // Test basic arithmetic operations
    const result = c.add(1, 1);
    expect(result.re).toBe(2);
    expect(result.im).toBe(3);
  });
});