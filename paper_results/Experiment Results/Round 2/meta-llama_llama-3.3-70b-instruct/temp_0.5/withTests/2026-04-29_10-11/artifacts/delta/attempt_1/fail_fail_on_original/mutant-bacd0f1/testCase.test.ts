import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform', () => {
  it('should handle null and object correctly', () => {
    const delta1 = new Delta().retain(1, { test: null });
    const delta2 = new Delta().retain(1, { test: 'object' });
    const transformedDelta = delta1.transform(delta2);
    expect(transformedDelta.ops[0].retain).toEqual({ test: 'object' });
  });
});