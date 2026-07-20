import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta module export condition', () => {
  it('should properly export Delta in CommonJS environment', () => {
    // This test verifies the module export condition works correctly
    // The mutation changes `typeof module === 'object'` to `if (true)`
    // which would cause the export to happen even when module is not defined

    // First verify Delta works normally
    const testDelta = new Delta().insert('test');
    expect(testDelta.ops).toEqual([{ insert: 'test' }]);

    // Verify the module export exists and is correct
    const moduleExports = require("../../../../../../../../../../../subject_repositories/delta/src/Delta");
    expect(moduleExports).toBeDefined();
    expect(moduleExports.default).toBe(Delta);

    // Verify we can create instances from the exported module
    const fromExports = new moduleExports.default().insert('exported');
    expect(fromExports.ops).toEqual([{ insert: 'exported' }]);
  });
});