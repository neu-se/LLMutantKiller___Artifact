import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js export behavior", () => {
  it("should have proper module exports structure", () => {
    // Test the module exports structure which is affected by the mutation
    const moduleExports = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

    // The mutation removes the AMD export logic which affects the exports structure
    // In the original code, the module should have these properties
    expect(moduleExports).toBeDefined();
    expect(typeof moduleExports).toBe('function');
    expect(moduleExports.__esModule).toBe(true);
    expect(moduleExports.default).toBe(moduleExports);
    expect(moduleExports.Complex).toBe(moduleExports);

    // Also verify basic functionality still works
    const c = new moduleExports(1, 1);
    expect(c.re).toBe(1);
    expect(c.im).toBe(1);
  });
});