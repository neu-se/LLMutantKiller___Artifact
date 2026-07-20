import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta module export condition', () => {
  it('should only export when module is an object', () => {
    // This test verifies the module export condition works correctly
    // The mutation changes `typeof module === 'object'` to `if (true)`
    // which would cause the export to happen even when module is not defined

    // Store original module
    const originalModule = global.module;

    try {
      // Set module to null to test the condition
      // @ts-ignore
      global.module = null;

      // Clear the require cache to force re-evaluation
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/delta/src/Delta")];

      // This should work in original (module is null, so no export)
      // but fail in mutated version (always exports regardless of module type)
      const moduleExports = require("../../../../../../../../../../../subject_repositories/delta/src/Delta");
      expect(moduleExports).toBeUndefined();
    } finally {
      // Restore original module
      global.module = originalModule;
    }
  });
});