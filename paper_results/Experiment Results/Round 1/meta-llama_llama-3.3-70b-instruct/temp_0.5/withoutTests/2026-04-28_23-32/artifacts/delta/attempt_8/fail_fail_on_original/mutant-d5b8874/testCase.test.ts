import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle retain and delete operations', () => {
    const delta = new Delta();
    delta.retain(1);
    delta.delete(1);
    const otherDelta = new Delta();
    otherDelta.retain(1);
    const composedDelta = delta.compose(otherDelta);
    expect(composedDelta.ops).toEqual([{ delete: 1 }]);
  });
});