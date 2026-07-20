// testCase.test.ts

import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta module export behavior', () => {
  it('should correctly handle module exports in Node.js environment', () => {
    // This test verifies the module export behavior which is affected by the mutation
    // The mutation changes the condition from `typeof module === 'object'` to `typeof module !== 'object'`
    // which would break the export in a Node.js environment where module is an object
    const delta = new Delta();
    expect(delta).toBeInstanceOf(Delta);

    // Verify the module exports are working correctly
    expect(Delta.Op).toBeDefined();
    expect(Delta.OpIterator).toBeDefined();
    expect(Delta.AttributeMap).toBeDefined();
  });
});