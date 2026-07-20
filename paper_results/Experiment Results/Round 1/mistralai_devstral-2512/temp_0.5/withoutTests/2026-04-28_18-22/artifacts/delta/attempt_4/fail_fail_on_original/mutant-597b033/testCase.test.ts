import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta module export condition', () => {
  it('should only export in CommonJS environment', () => {
    // Test that the module export condition works correctly
    // The mutation changes `if (typeof module === 'object')` to `if (true)`
    // which would cause exports even in non-CommonJS environments

    // Create a fresh require context to test the export behavior
    const Module = require('module');
    const originalRequire = Module.prototype.require;

    let exportHappened = false;
    Module.prototype.require = function(id) {
      if (id.endsWith('Delta')) {
        exportHappened = true;
      }
      return originalRequire.apply(this, arguments);
    };

    try {
      // Clear require cache
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/delta/src/Delta")];

      // Simulate non-CommonJS environment by temporarily removing module
      const originalModule = global.module;
      global.module = undefined;

      // This should not trigger exports in original code
      require("../../../../../../../../../../../subject_repositories/delta/src/Delta");

      // In original code, export should not happen when module is undefined
      // In mutated code (if true), export would happen
      expect(exportHappened).toBe(false);
    } finally {
      // Restore
      global.module = originalModule;
      Module.prototype.require = originalRequire;
    }
  });
});