import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('diff() should return a Delta object when the input Deltas are the same', () => {
    const delta1 = new Delta().insert('Hello, World!');
    const delta2 = new Delta().insert('Hello, World!');
    const result = delta1.diff(delta2);
    expect(result).toEqual(new Delta());
  });
});