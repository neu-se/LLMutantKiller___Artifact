import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('module export behavior', () => {
  it('should not execute export logic when module is not an object', () => {
    // This test verifies the mutation by checking if the module export logic
    // incorrectly executes when module is not an object
    // The mutation changes `if (typeof module === 'object')` to `if (true)`
    // which would cause the export logic to run even when module is not an object

    // Store original module
    const originalModule = (global as any).module;

    try {
      // Simulate non-CommonJS environment
      (global as any).module = undefined;

      // Clear require cache to force re-evaluation
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/delta/src/Delta")];

      // This should work in original code but might fail in mutated code
      // because the export logic would try to execute when module is undefined
      const DeltaConstructor = require("../../../../../../../../../../../subject_repositories/delta/src/Delta").default;
      const delta = new DeltaConstructor().insert('test');
      expect(delta.ops).toEqual([{ insert: 'test' }]);
    } finally {
      // Restore original module
      (global as any).module = originalModule;
    }
  });
});