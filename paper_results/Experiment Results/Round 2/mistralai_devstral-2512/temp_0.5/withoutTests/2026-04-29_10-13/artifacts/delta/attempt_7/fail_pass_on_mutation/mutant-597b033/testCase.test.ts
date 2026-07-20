import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta module export behavior", () => {
  it("should only execute module export code in CommonJS environment", () => {
    // This test verifies that the module export code only runs when typeof module === 'object'
    // The mutation changes this condition to always true, which would cause the export code
    // to run even when module is not defined (like in ESM environments)

    // Store the original module
    const originalModule = global.module;

    // Simulate non-CommonJS environment by deleting module
    // @ts-ignore
    delete global.module;

    try {
      // Clear the module cache to force re-evaluation
      const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/delta/src/Delta");
      delete require.cache[modulePath];

      // Require the module again - in original code this should work fine
      // In mutated code, this will throw because module.exports is set when module is undefined
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