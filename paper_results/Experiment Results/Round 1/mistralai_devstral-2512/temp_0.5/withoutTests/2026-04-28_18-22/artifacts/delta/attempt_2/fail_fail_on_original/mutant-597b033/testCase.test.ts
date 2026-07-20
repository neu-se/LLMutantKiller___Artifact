import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta module export condition', () => {
  it('should only export when in a CommonJS environment', () => {
    // This test verifies the module export condition works correctly
    // The mutation changes `if (typeof module === 'object')` to `if (true)`
    // which would cause exports even in non-CommonJS environments

    // In a real CommonJS environment, module would be defined
    // We simulate a non-CommonJS environment by checking if the export would happen
    // when module is not an object
    const originalModule = global.module;
    delete global.module;

    try {
      // Clear the require cache to force re-evaluation
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/delta/src/Delta.ts")];

      // This should not export anything in non-CommonJS environment
      const exports = require("../../../../../../../../../../../subject_repositories/delta/src/Delta.ts");

      // In original code, exports should be empty object when module is not defined
      // In mutated code, exports would contain Delta even when module is not defined
      expect(exports).toEqual({});
    } finally {
      // Restore original module
      global.module = originalModule;
    }
  });
});