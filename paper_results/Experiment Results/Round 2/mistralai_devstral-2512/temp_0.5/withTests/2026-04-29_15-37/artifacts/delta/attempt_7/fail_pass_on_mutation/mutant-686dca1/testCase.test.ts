// testCase.test.ts

import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta module export', () => {
  it('should export Delta when module is an object', () => {
    // This test specifically checks the module export behavior
    // The mutation changes the condition from `typeof module === 'object'` to `typeof module !== 'object'`
    // which should break the export in Node.js environment
    const delta = new Delta();
    expect(delta).toBeInstanceOf(Delta);

    // Verify we can access the Delta class properties
    expect(Delta.Op).toBeDefined();
    expect(Delta.OpIterator).toBeDefined();
    expect(Delta.AttributeMap).toBeDefined();

    // Verify we can create instances and use basic functionality
    const testDelta = new Delta().insert('test');
    expect(testDelta.ops).toEqual([{ insert: 'test' }]);
  });
});