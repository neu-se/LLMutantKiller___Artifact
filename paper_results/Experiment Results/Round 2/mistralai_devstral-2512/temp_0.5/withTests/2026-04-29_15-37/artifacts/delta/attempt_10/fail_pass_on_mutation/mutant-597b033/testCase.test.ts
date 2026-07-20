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
      (global as any).module = Symbol('test');

      // Clear require cache to force re-evaluation
      const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/delta/src/Delta");
      delete require.cache[modulePath];

      // This should throw an error in mutated code because it tries to access
      // module.exports when module is a Symbol
      expect(() => {
        require(modulePath);
      }).not.toThrow();

      // If we get here, the original code is working correctly
      const DeltaConstructor = require(modulePath).default;
      const delta = new DeltaConstructor().insert('test');
      expect(delta.ops).toEqual([{ insert: 'test' }]);
    } finally {
      // Restore original module
      (global as any).module = originalModule;
    }
  });
});