import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js module export structure", () => {
  it("should have correct export structure", () => {
    // The mutation breaks the export logic by having an empty if block
    // This test verifies the exports are properly configured
    const moduleExports = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

    // Verify the module exports structure
    expect(moduleExports).toBeDefined();
    expect(moduleExports.Complex).toBeDefined();
    expect(moduleExports.default).toBeDefined();

    // The key difference: in the original code, Complex should be the same as default
    // In the mutated code, this relationship might be broken
    expect(moduleExports.Complex).toBe(moduleExports.default);

    // Verify we can use the exported Complex class
    const c = new moduleExports.Complex(1, 1);
    expect(c.add(1, 1).toString()).toBe("2 + 2i");
  });
});