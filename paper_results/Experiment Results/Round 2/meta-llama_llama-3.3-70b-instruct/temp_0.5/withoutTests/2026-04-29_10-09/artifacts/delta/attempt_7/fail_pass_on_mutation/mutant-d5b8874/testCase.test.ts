import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should handle delete and retain correctly', () => {
    const delta1 = new Delta().insert('test');
    const delta2 = new Delta().delete(4);
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops.length).toBe(0);
  });
});