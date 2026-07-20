import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should transform correctly when otherData is null', () => {
    const delta1 = new Delta().insert('Hello, world!');
    const delta2 = new Delta().retain(13, {});
    const transformedDelta = delta1.transform(delta2);
    expect(transformedDelta.ops.length).toBe(1);
    expect(transformedDelta.ops[0].retain).toBe(13);
  });
});