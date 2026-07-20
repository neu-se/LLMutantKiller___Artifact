import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should return an empty delta when the two deltas are identical', () => {
    const delta1 = new Delta().insert('Hello');
    const delta2 = new Delta().insert('Hello');
    expect(delta1.diff(delta2)).toEqual(new Delta());
    expect(delta1.diff(delta1)).toEqual(new Delta());
    const delta3 = new Delta().insert('Hello');
    if (delta1.ops !== delta3.ops) {
      throw new Error('Deltas are not identical');
    }
  });
});