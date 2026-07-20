import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('diff() should optimize when the two Deltas are the same', () => {
    const delta1 = new Delta().insert('Hello, World!');
    const delta2 = new Delta().insert('Hello, World!');
    const result = delta1.diff(delta2);
    expect(result.ops).toEqual([]);
  });
});