import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta module export behavior', () => {
  it('should correctly export Delta in CommonJS environment', () => {
    // This test verifies the module export condition works correctly
    // The mutation changes `typeof module === 'object'` to `if (true)`
    // which would cause issues in non-CommonJS environments

    // Verify Delta works normally
    const testDelta = new Delta().insert('test');
    expect(testDelta.ops).toEqual([{ insert: 'test' }]);

    // Verify the module export exists and is correct
    const moduleExports = require("../../../../../../../../../../../subject_repositories/delta/src/Delta");
    expect(moduleExports).toBeDefined();
    expect(moduleExports.default).toBe(Delta);
    expect(moduleExports).toBe(Delta);

    // Verify we can create instances from both exports
    const fromDefault = new moduleExports.default().insert('default');
    const fromDirect = new moduleExports().insert('direct');
    expect(fromDefault.ops).toEqual([{ insert: 'default' }]);
    expect(fromDirect.ops).toEqual([{ insert: 'direct' }]);
  });
});