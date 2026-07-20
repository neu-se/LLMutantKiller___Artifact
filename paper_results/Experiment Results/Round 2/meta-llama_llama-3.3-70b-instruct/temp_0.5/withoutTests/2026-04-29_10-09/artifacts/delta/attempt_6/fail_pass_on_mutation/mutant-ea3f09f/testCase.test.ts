import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should transform correctly when otherData is null', () => {
    const delta1 = new Delta();
    delta1.retain(10, null);
    const delta2 = new Delta();
    delta2.retain({ test: 'data' }, null);
    const transformed = delta1.transform(delta2);
    expect(transformed.ops.length).toBe(1);
    if (typeof transformed.ops[0].retain === 'object') {
      expect(Object.keys(transformed.ops[0].retain)).toEqual(['test']);
    }
  });
});