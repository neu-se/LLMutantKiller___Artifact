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
    const delta2 = new Delta();
    delta2.retain({ a: 'b' });
    delta2.delete(1);
    const otherDelta2 = new Delta();
    otherDelta2.retain({ a: 'c' });
    const composedDelta2 = delta2.compose(otherDelta2);
    expect(composedDelta2.ops).toEqual([{ delete: 1 }, { retain: { a: 'c' } }]);
  });
});