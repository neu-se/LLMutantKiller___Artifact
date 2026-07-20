describe('Delta module export condition', () => {
  it('should only export when module is an object', () => {
    // This test verifies the module export condition works correctly
    // The mutation changes `if (typeof module === 'object')` to `if (true)`
    // which would cause exports even when module is not an object

    // We'll test this by temporarily modifying the global module
    // to see if exports still happen when module is not an object
    const originalModule = global.module;

    try {
      // Set module to undefined to simulate non-CommonJS environment
      delete global.module;

      // Clear require cache to force re-evaluation
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/delta/src/Delta")];

      // Try to require the module when module is not an object
      const exports = require("../../../../../../../../../../../subject_repositories/delta/src/Delta");

      // In original code, exports should be empty when module is not an object
      // In mutated code (if true), exports will contain Delta even when module is not an object
      expect(Object.keys(exports).length).toBe(0);
    } finally {
      // Restore original module
      global.module = originalModule;
    }
  });
});