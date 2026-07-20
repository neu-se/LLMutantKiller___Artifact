import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle retain and delete operations', () => {
    const delta = new Delta();
    delta.retain({ a: null }, { b: 'c' });
    delta.delete(1);
    const otherDelta = new Delta();
    otherDelta.retain({ a: null }, { b: 'd' });
    const composedDelta = delta.compose(otherDelta);
    expect(composedDelta.ops).toEqual([{ delete: 1 }, { retain: { a: null }, attributes: { b: 'd' } }]);
  });
});