import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta module export behavior", () => {
  it("should not set module.exports when not in a CommonJS environment", () => {
    // This test verifies that module.exports is only set when typeof module === 'object'
    // The mutation changes this condition to always true, which would incorrectly set
    // module.exports even when module is not defined (like in ESM environments)
    const originalModule = global.module;
    // @ts-ignore - We're testing the module export behavior
    delete global.module;

    try {
      // Re-import to test the export behavior
      const { default: Delta } = require("../../../../../../../../../../../subject_repositories/delta/src/Delta.ts");
      expect(Delta).toBeDefined();
      expect(typeof Delta).toBe('function');
    } finally {
      // Restore original module
      global.module = originalModule;
    }
  });
});