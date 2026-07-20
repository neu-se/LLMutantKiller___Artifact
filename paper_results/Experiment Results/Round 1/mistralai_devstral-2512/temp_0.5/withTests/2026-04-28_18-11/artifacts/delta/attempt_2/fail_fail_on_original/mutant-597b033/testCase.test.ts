import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta module export condition', () => {
  it('should only export when module is an object', () => {
    // This test verifies the module export condition works correctly
    // The mutation changes `typeof module === 'object'` to `if (true)`
    // which would cause the export to happen even when module is not defined
    const originalModule = global.module;
    try {
      // @ts-ignore - intentionally setting module to undefined
      global.module = undefined;
      // Force re-import to test the export condition
      // In the mutated version, this would still export even with module undefined
      const { default: DeltaExport } = require("../../../../../../../../../../../subject_repositories/delta/src/Delta");
      expect(DeltaExport).toBeUndefined();
    } finally {
      global.module = originalModule;
    }
  });
});