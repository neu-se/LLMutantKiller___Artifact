import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta module export', () => {
  it('should export Delta as a CommonJS module', () => {
    // This test verifies that Delta is properly exported as a CommonJS module
    // The mutation changes the module export condition from `typeof module === 'object'` to `if (true)`
    // In a CommonJS environment, `typeof module` should be 'object', so the original code works correctly
    // The mutated code will always execute the export, which might cause issues in non-CommonJS environments
    // We test this by verifying the module exports exist and are correct

    // Verify Delta is exported
    expect(Delta).toBeDefined();
    expect(typeof Delta).toBe('function');

    // Verify the default export exists
    const moduleExports = require("../../../../../../../../../../../subject_repositories/delta/src/Delta.ts");
    expect(moduleExports).toBeDefined();
    expect(moduleExports.default).toBe(Delta);

    // Verify we can create an instance
    const delta = new Delta();
    expect(delta).toBeInstanceOf(Delta);
  });
});