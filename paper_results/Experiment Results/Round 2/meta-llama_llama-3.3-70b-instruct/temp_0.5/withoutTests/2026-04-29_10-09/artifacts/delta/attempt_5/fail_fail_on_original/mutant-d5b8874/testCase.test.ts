import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should handle delete and retain correctly', () => {
    const delta1 = new Delta().insert({ a: 'test' });
    const delta2 = new Delta().delete(1);
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops).toEqual([{ delete: 1 }]);
  });
});