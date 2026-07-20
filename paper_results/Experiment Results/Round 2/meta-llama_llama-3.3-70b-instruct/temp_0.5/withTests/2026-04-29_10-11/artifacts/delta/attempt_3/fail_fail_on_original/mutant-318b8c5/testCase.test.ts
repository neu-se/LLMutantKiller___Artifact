import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('diff() with max instead of min', () => {
    const a = new Delta().insert('A');
    const b = new Delta().insert('AB');
    const expected = new Delta().retain(1).insert('B');
    const actual = a.diff(b);
    expect(actual.ops[0].insert).toHaveLength(1);
  });
});