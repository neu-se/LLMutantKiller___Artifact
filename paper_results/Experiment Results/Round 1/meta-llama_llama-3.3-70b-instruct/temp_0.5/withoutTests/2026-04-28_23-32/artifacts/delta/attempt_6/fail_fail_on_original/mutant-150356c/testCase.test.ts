import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly compose deltas', () => {
    const delta1 = new Delta().insert('a');
    const delta2 = new Delta().retain(1).insert('b');
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops).toEqual([{ insert: 'a' }, { insert: 'b' }]);
  });
});