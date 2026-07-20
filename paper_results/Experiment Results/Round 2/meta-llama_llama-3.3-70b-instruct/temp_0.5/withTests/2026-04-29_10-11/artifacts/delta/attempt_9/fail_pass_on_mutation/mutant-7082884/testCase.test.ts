import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should return an empty delta when the input deltas are the same', () => {
    const delta1 = new Delta().insert('Hello');
    const delta2 = new Delta(delta1.ops);
    expect(delta1.diff(delta2)).toEqual(new Delta());
    const result = delta1.diff(delta1);
    expect(result.ops).toEqual([]);
  });
});