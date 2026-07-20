// testCase.test.ts

import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta module export', () => {
  it('should export Delta when module is an object (Node.js environment)', () => {
    // This test specifically targets the module export behavior affected by the mutation
    // The mutation changes: if (typeof module === 'object') to if (typeof module !== 'object')
    // In Node.js, module is always an object, so this should fail with the mutation

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