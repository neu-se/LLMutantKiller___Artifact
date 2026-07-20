import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta module export condition', () => {
  it('should only export when module is an object', () => {
    // This test verifies the module export condition works correctly
    // The mutation changes `typeof module === 'object'` to `if (true)`
    // which would cause the export to happen even when module is not defined

    // Store original module
    const originalModule = global.module;

    try {
      // Set module to undefined to test the condition
      // @ts-ignore
      global.module = undefined;

      // Clear the require cache to force re-evaluation
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/delta/src/Delta")];

      // This should fail in the mutated version because it will try to export even when module is undefined
      const moduleExports = require("../../../../../../../../../../../subject_repositories/delta/src/Delta");
      expect(moduleExports).toBeUndefined();
    } finally {
      // Restore original module
      global.module = originalModule;
    }
  });
});