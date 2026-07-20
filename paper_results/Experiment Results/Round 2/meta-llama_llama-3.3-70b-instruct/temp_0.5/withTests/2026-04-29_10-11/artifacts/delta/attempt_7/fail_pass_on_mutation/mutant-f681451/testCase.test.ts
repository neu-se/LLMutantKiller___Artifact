import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform', () => {
  it('should correctly handle delete operations', () => {
    const delta1 = new Delta().retain(1);
    const delta2 = new Delta().delete(1);
    const result = delta1.transform(delta2, true);
    expect(result.ops.length).toBe(1);
    expect(result.ops[0].delete).toBe(1);
    expect(result.ops[0].retain).toBeUndefined();
  });
});