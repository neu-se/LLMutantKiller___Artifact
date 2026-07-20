import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle retain and delete operations', () => {
    const delta = new Delta();
    delta.retain({ a: 'b' }, { c: 'd' });
    delta.delete(1);
    const otherDelta = new Delta();
    otherDelta.retain({ a: 'b' }, { c: 'd' });
    const composedDelta = delta.compose(otherDelta);
    expect(composedDelta.ops).toEqual([{ retain: { a: 'b' }, attributes: { c: 'd' } }, { delete: 1 }]);
  });
});