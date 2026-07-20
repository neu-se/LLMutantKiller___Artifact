// testCase.test.ts

import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta module export', () => {
  it('should export Delta correctly in Node.js environment', () => {
    // This test specifically checks the module export behavior affected by the mutation
    // The mutation changes the condition from `typeof module === 'object'` to `typeof module !== 'object'`
    // which should break the export in Node.js environment where module is an object

    // Verify Delta is exported
    expect(Delta).toBeDefined();
    expect(typeof Delta).toBe('function');

    // Verify we can create instances
    const delta = new Delta();
    expect(delta).toBeInstanceOf(Delta);

    // Verify static properties are accessible
    expect(Delta.Op).toBeDefined();
    expect(Delta.OpIterator).toBeDefined();
    expect(Delta.AttributeMap).toBeDefined();

    // Verify basic functionality
    const testDelta = new Delta().insert('test');
    expect(testDelta.ops).toEqual([{ insert: 'test' }]);
  });
});