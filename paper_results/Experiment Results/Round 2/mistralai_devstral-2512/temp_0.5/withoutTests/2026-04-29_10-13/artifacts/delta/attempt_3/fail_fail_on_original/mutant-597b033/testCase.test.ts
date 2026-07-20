import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta module export behavior", () => {
  it("should not set module.exports when module is not defined", () => {
    // This test verifies that module.exports is only set when typeof module === 'object'
    // The mutation changes this condition to always true, which would incorrectly set
    // module.exports even when module is not defined (like in ESM environments)
    const originalModule = global.module;
    // @ts-ignore - We're testing the module export behavior
    delete global.module;

    try {
      // Force re-evaluation of the module to test the export behavior
      const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/delta/src/Delta.ts");
      delete require.cache[modulePath];
      const freshModule = require(modulePath);

      // In the original code, module.exports should not be set when module is undefined
      // In the mutated code, module.exports will be set even when module is undefined
      expect(freshModule).toBeUndefined();
    } finally {
      // Restore original module
      global.module = originalModule;
    }
  });
});