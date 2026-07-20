import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should return a Delta with the correct length when calling diff() on two Deltas', () => {
    const delta1 = new Delta([{ insert: 'Hello' }, { insert: 'World' }]);
    const delta2 = new Delta([{ insert: 'Hello' }, { insert: 'Universe' }]);
    const result = delta1.diff(delta2);
    expect(result.ops).not.toHaveLength(0);
  });
});