import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('diff() with max instead of min', () => {
    const a = new Delta().insert('A');
    const b = new Delta().insert('ABC');
    const result = a.diff(b);
    expect(result.ops[0].retain).toBe(1);
    expect(result.ops[1].insert).toBe('BC');
  });
});