import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should transform correctly when thisData is an object and otherData is an object', () => {
    const delta1 = new Delta().insert('Hello');
    const delta2 = new Delta().insert('World');
    const transformedDelta = delta1.transform(delta2, true);
    expect(transformedDelta.ops.length).toBe(2);
  });
});