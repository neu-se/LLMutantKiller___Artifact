import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js export structure", () => {
  it("should have correct export structure in CommonJS", () => {
    // The mutation breaks the export logic by having an empty if block
    // This test verifies the exports are properly configured
    const exports = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

    // Check that the module exports are properly set up
    expect(exports).toBeDefined();
    expect(exports.Complex).toBeDefined();
    expect(exports.default).toBeDefined();

    // The key difference: in the original code, Complex should be the same as default
    // In the mutated code, this relationship might be broken
    expect(exports.Complex).toBe(exports.default);

    // Verify functionality still works
    const c = new exports.Complex(1, 1);
    expect(c.add(1, 1).toString()).toBe("2 + 2i");
  });
});