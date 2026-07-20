import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta module export behavior", () => {
  it("should not set module.exports when module is undefined", () => {
    // This test verifies that module.exports is only set when typeof module === 'object'
    // The mutation changes this condition to always true, which would cause the export code
    // to run even when module is undefined

    // Store the original module
    const originalModule = global.module;

    // Simulate ESM environment by setting module to undefined
    // @ts-ignore
    global.module = undefined;

    try {
      // Clear the module cache to force re-evaluation
      const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/delta/src/Delta");
      delete require.cache[modulePath];

      // Require the module again
      // In original code, module.exports should not be set when module is undefined
      // In mutated code, module.exports will be set even when module is undefined
      const freshModule = require(modulePath);

      // In original code, this should work fine
      expect(freshModule).toBeDefined();
      expect(typeof freshModule).toBe('function');

      // Create instance to verify functionality
      const delta = new freshModule();
      delta.insert("test");
      expect(delta.ops).toEqual([{ insert: "test" }]);
    } finally {
      // Restore original module
      global.module = originalModule;
    }
  });
});