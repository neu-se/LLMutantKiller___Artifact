import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should return an empty delta when the two deltas have the same ops and are constructed in the same way', () => {
    const delta1 = new Delta().insert('Hello');
    const delta2 = new Delta().insert('Hello');
    expect(delta1.diff(delta2)).toEqual(new Delta());
    const delta3 = new Delta(delta1.ops);
    expect(delta1.diff(delta3)).toEqual(new Delta());
    expect(() => {
      delta1.diff(new Delta().retain(5));
    }).toThrowError('diff() called on non-document');
  });
});