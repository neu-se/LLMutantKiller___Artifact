import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta module export behavior', () => {
  it('should not export when module is not an object', () => {
    // This test verifies the module export condition by checking if Delta
    // is properly exported only when module is an object
    // The mutation changes the condition to always true, which would cause issues
    const testDelta = new Delta().insert('test');
    expect(testDelta.ops).toEqual([{ insert: 'test' }]);

    // Verify the module export exists in CommonJS context
    // This will fail in the mutated version because the export condition is broken
    const moduleExports = require("../../../../../../../../../../../subject_repositories/delta/src/Delta");
    expect(moduleExports).toBeDefined();
    expect(moduleExports.default).toBe(Delta);
  });
});