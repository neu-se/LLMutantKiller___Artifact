import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta transform function', () => {
  it('should not transform embed types when they do not match', () => {
    const delta1 = new Delta().insert({ a: 'value1' });
    const delta2 = new Delta().retain(1);
    const transformedDelta = delta1.transform(delta2);
    expect(transformedDelta.ops.length).toBe(0);
    expect(transformedDelta.ops).toEqual([]);
  });
});