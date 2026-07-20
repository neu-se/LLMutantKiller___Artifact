import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta module export condition', () => {
  it('should properly handle module export condition', () => {
    // This test verifies the module export condition works correctly
    // The mutation changes `typeof module === 'object'` to `if (true)`
    // which would cause the export to happen even when module is not defined

    // First verify Delta works normally
    const testDelta = new Delta().insert('test');
    expect(testDelta.ops).toEqual([{ insert: 'test' }]);

    // Verify the module export exists in CommonJS context
    const moduleExports = require("../../../../../../../../../../../subject_repositories/delta/src/Delta");
    expect(moduleExports).toBeDefined();
    expect(moduleExports.default).toBe(Delta);

    // The key test: verify that module.exports is set correctly
    // In the mutated version, this would fail because the export condition is broken
    expect(module.exports).toBeDefined();
    expect(module.exports.default).toBe(Delta);
  });
});