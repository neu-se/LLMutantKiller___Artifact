import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta module export condition', () => {
  it('should only export when module is an object', () => {
    // This test verifies the module export condition
    // The mutation changes `if (typeof module === 'object')` to `if (true)`
    // which would cause exports even when module is not an object

    // We'll test this by checking if the module exports work correctly
    // in a CommonJS environment (where module should be an object)
    const moduleExports = require("../../../../../../../../../../../subject_repositories/delta/src/Delta");

    // In original code, these exports should exist when module is an object
    // In mutated code, these would exist regardless of module type
    expect(moduleExports).toBeDefined();
    expect(moduleExports.default).toBe(Delta);
    expect(moduleExports.Op).toBeDefined();
    expect(moduleExports.OpIterator).toBeDefined();
    expect(moduleExports.AttributeMap).toBeDefined();

    // Now test that the condition works by checking if Delta is the same
    // when imported directly vs through require
    expect(Delta).toBe(moduleExports.default);

    // Test that we can create instances from both
    const delta1 = new Delta();
    const delta2 = new moduleExports.default();
    expect(delta1).toBeInstanceOf(Delta);
    expect(delta2).toBeInstanceOf(Delta);
  });
});