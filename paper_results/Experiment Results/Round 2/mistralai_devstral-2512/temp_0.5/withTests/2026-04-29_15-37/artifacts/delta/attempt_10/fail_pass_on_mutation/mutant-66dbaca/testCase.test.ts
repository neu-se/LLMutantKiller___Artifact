import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta export verification', () => {
  it('should be able to require Delta using CommonJS syntax', () => {
    // This test verifies we can access Delta through both import and require
    // The mutation breaks the CommonJS export while keeping ES6 export
    const DeltaRequired = require('../../../../../../../../../../../subject_repositories/delta/src/Delta').default;

    // Verify both imports reference the same class
    expect(DeltaRequired).toBe(Delta);

    // Verify basic functionality works
    const delta = new DeltaRequired().insert('test');
    expect(delta.ops).toEqual([{ insert: 'test' }]);
  });
});