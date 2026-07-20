import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js export behavior", () => {
  it("should properly handle module exports in Node.js environment", () => {
    // Test that the module exports work correctly in CommonJS
    // The mutation breaks the export logic by having an empty if block
    const moduleExports = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

    // Verify the exports structure
    expect(moduleExports).toBeDefined();
    expect(moduleExports.__esModule).toBe(true);
    expect(moduleExports.default).toBeDefined();
    expect(moduleExports.Complex).toBeDefined();
    expect(moduleExports.default).toBe(moduleExports.Complex);

    // Verify we can use the exported Complex class
    const c = new moduleExports.Complex(2, 3);
    expect(c.re).toBe(2);
    expect(c.im).toBe(3);
  });
});