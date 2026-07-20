import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('module export behavior', () => {
  it('should export Delta correctly in Node.js environment', () => {
    // This test verifies the module export behavior which depends on the mutated condition
    // The mutation changes `typeof module === 'object'` to `typeof module !== 'object'`
    // In a Node.js environment, `module` is an object, so this test should pass with the original code
    // and fail with the mutated code since the export behavior would be inverted

    // We test by checking if the module exports work correctly
    // The original code exports Delta properly when module is an object
    // The mutated code would fail to export properly in Node.js environment

    // Create a Delta instance to verify the class is properly exported
    const delta = new Delta().insert('test');
    expect(delta.ops).toEqual([{ insert: 'test' }]);

    // Verify the module export structure
    const moduleExports = require("../../../../../../../../../../../subject_repositories/delta/src/Delta");
    expect(moduleExports.default).toBe(Delta);
    expect(moduleExports).toBe(Delta);

    // The test will fail on mutated code because the export won't work correctly
    // in a Node.js environment where module is an object
  });
});