import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta module export', () => {
  it('should export Delta as module.exports when module is an object', () => {
    const required = require('../../../../../../../../../../../subject_repositories/delta/src/Delta.ts');
    // The original code checks typeof module === 'object' before assigning
    // Both should work in Node.js, but let's verify the CJS export is correct
    expect(typeof required).toBe('function');
    expect(required === Delta).toBe(true);
  });
});