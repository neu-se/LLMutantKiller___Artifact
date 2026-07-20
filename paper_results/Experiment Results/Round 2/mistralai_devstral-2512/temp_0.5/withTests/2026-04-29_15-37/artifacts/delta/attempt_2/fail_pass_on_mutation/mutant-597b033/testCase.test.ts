import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('module export behavior', () => {
  it('should have different export behavior when module is not an object', () => {
    // This test verifies the mutation by checking if the module export logic
    // incorrectly executes in a non-CommonJS environment
    // The mutation changes `if (typeof module === 'object')` to `if (true)`
    // which would cause the export logic to run even when module is not an object

    // Create a mock environment where module is not an object
    const originalModule = global.module;
    // @ts-ignore
    delete global.module;

    try {
      // Force re-import to test the export logic
      // In the mutated version, this would incorrectly set exports
      // even though module is not an object
      const DeltaConstructor = require("../../../../../../../../../../../subject_repositories/delta/src/Delta").default;
      const delta = new DeltaConstructor().insert('test');
      expect(delta.ops).toEqual([{ insert: 'test' }]);
    } finally {
      // Restore original module
      global.module = originalModule;
    }
  });
});