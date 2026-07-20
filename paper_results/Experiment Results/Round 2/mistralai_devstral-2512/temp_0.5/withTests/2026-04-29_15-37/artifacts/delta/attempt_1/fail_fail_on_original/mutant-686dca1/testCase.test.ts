// test/delta/module-export.test.ts

import Delta from '../../src/Delta';

describe('Delta module export', () => {
  it('should export Delta as default', () => {
    // This test verifies that the module exports Delta correctly
    // The mutation changes the condition from `typeof module === 'object'` to `typeof module !== 'object'`
    // which would break the export in a Node.js environment where module is an object
    expect(Delta).toBeDefined();
    expect(typeof Delta).toBe('function');
    const delta = new Delta();
    expect(delta).toBeInstanceOf(Delta);
  });
});